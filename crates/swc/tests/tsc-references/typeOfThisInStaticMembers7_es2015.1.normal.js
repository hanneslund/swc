import * as swcHelpers from "@swc/helpers";
// @target: esnext, es2022, es6, es5
class C {
}
C.a = 1;
C.b = C.a + 1;
class D extends C {
}
D.c = 2;
D.d = D.c + 1;
D.e = 1 + swcHelpers.get(swcHelpers.getPrototypeOf(D), "a", D) + (D.c + 1) + 1;
