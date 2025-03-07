use swc_atoms::js_word;
use swc_common::{util::take::Take, SyntaxContext, DUMMY_SP};
use swc_ecma_ast::*;
use swc_ecma_utils::{ExprExt, ExprFactory};

use super::Pure;

impl Pure<'_> {
    pub(super) fn drop_useless_ident_ref_in_seq(&mut self, seq: &mut SeqExpr) {
        if !self.options.collapse_vars {
            return;
        }

        if seq.exprs.len() < 2 {
            return;
        }

        if let (Expr::Assign(assign @ AssignExpr { op: op!("="), .. }), Expr::Ident(ident)) = (
            &*seq.exprs[seq.exprs.len() - 2],
            &*seq.exprs[seq.exprs.len() - 1],
        ) {
            // Check if lhs is same as `ident`.
            match &assign.left {
                PatOrExpr::Expr(_) => {}
                PatOrExpr::Pat(left) => {
                    if let Pat::Ident(left) = &**left {
                        if left.id.sym == ident.sym && left.id.span.ctxt == ident.span.ctxt {
                            report_change!(
                                "drop_useless_ident_ref_in_seq: Dropping `{}` as it's useless",
                                left.id
                            );
                            self.changed = true;
                            seq.exprs.pop();
                        }
                    }
                }
            }
        }
    }

    ///
    /// - `(a, b, c) && d` => `a, b, c && d`
    pub(super) fn lift_seqs_of_bin(&mut self, e: &mut Expr) {
        let bin = match e {
            Expr::Bin(b) => b,
            _ => return,
        };

        if let Expr::Seq(left) = &mut *bin.left {
            if left.exprs.is_empty() {
                return;
            }

            self.changed = true;
            report_change!("sequences: Lifting sequence in a binary expression");

            let left_last = left.exprs.pop().unwrap();

            let mut exprs = left.exprs.take();

            exprs.push(Box::new(Expr::Bin(BinExpr {
                span: left.span,
                op: bin.op,
                left: left_last,
                right: bin.right.take(),
            })));

            *e = Expr::Seq(SeqExpr {
                span: bin.span,
                exprs,
            })
        }
    }

    ///
    /// - `x = (foo(), bar(), baz()) ? 10 : 20` => `foo(), bar(), x = baz() ? 10
    ///   : 20;`
    pub(super) fn lift_seqs_of_cond_assign(&mut self, e: &mut Expr) {
        if !self.options.sequences() {
            return;
        }

        let assign = match e {
            Expr::Assign(v @ AssignExpr { op: op!("="), .. }) => v,
            _ => return,
        };

        let cond = match &mut *assign.right {
            Expr::Cond(v) => v,
            _ => return,
        };

        if let Expr::Seq(test) = &mut *cond.test {
            //
            if test.exprs.len() >= 2 {
                let mut new_seq = vec![];
                new_seq.extend(test.exprs.drain(..test.exprs.len() - 1));

                self.changed = true;
                report_change!("sequences: Lifting sequences in a assignment with cond expr");
                let new_cond = CondExpr {
                    span: cond.span,
                    test: test.exprs.pop().unwrap(),
                    cons: cond.cons.take(),
                    alt: cond.alt.take(),
                };

                new_seq.push(Box::new(Expr::Assign(AssignExpr {
                    span: assign.span,
                    op: assign.op,
                    left: assign.left.take(),
                    right: Box::new(Expr::Cond(new_cond)),
                })));

                *e = Expr::Seq(SeqExpr {
                    span: assign.span,
                    exprs: new_seq,
                });
            }
        }
    }

    /// `(a = foo, a.apply())` => `(a = foo).apply()`
    ///
    /// This is useful for outputs of swc/babel
    pub(super) fn merge_seq_call(&mut self, e: &mut SeqExpr) {
        if !self.options.sequences() {
            return;
        }

        for idx in 0..e.exprs.len() {
            let (e1, e2) = e.exprs.split_at_mut(idx);

            let a = match e1.last_mut() {
                Some(v) => &mut **v,
                None => continue,
            };

            let b = match e2.first_mut() {
                Some(v) => &mut **v,
                None => continue,
            };

            if let (
                Expr::Assign(a_assign @ AssignExpr { op: op!("="), .. }),
                Expr::Call(CallExpr {
                    callee: Callee::Expr(b_callee),
                    args,
                    ..
                }),
            ) = (&mut *a, &mut *b)
            {
                let var_name = a_assign.left.as_ident();
                let var_name = match var_name {
                    Some(v) => v,
                    None => continue,
                };

                if let Expr::Member(MemberExpr {
                    obj: b_callee_obj,
                    prop:
                        prop @ MemberProp::Ident(Ident {
                            sym: js_word!("apply") | js_word!("call"),
                            ..
                        }),
                    ..
                }) = &mut **b_callee
                {
                    //
                    if !b_callee_obj.is_ident_ref_to(var_name.sym.clone()) {
                        continue;
                    }

                    let span = a_assign.span.with_ctxt(SyntaxContext::empty());

                    let obj = Box::new(a.take());

                    let new = Expr::Call(CallExpr {
                        span,
                        callee: MemberExpr {
                            span: DUMMY_SP,
                            obj,
                            prop: prop.take(),
                        }
                        .as_callee(),
                        args: args.take(),
                        type_args: Default::default(),
                    });
                    b.take();
                    self.changed = true;
                    report_change!(
                        "sequences: Reducing `(a = foo, a.call())` to `((a = foo).call())`"
                    );

                    *a = new;
                };
            }
        }
    }
}
