import * as swcHelpers from "@swc/helpers";
// @target: es5
var t1 = 10;
var t2 = 10;
var s;
// With templateHead
"hello ".concat(Math.pow(t1, t2));
"hello ".concat(Math.pow(t1, Math.pow(t2, t1)));
"hello ".concat(t1 + Math.pow(t2, t1));
"hello ".concat(Math.pow(t1, t2) + t1);
"hello ".concat(t1 + Math.pow(t2, t2) + t1);
"hello ".concat(swcHelpers.typeOf(Math.pow(t1, Math.pow(t2, t1))));
"hello ".concat(1 + swcHelpers.typeOf(Math.pow(t1, Math.pow(t2, t1))));
"hello ".concat(Math.pow(t1, t2)).concat(Math.pow(t1, t2));
"hello ".concat(Math.pow(t1, Math.pow(t2, t1))).concat(Math.pow(t1, Math.pow(t2, t1)));
"hello ".concat(t1 + Math.pow(t2, t1)).concat(t1 + Math.pow(t2, t1));
"hello ".concat(Math.pow(t1, t2) + t1).concat(Math.pow(t1, t2) + t1);
"hello ".concat(t1 + Math.pow(t2, t2) + t1).concat(t1 + Math.pow(t2, t2) + t1);
"hello ".concat(swcHelpers.typeOf(Math.pow(t1, Math.pow(t2, t1)))).concat(swcHelpers.typeOf(Math.pow(t1, Math.pow(t2, t1))));
"hello ".concat(Math.pow(t1, t2), " hello world ").concat(Math.pow(t1, t2));
"hello ".concat(Math.pow(t1, Math.pow(t2, t1)), " hello world ").concat(Math.pow(t1, Math.pow(t2, t1)));
"hello ".concat(t1 + Math.pow(t2, t1), " hello world ").concat(t1 + Math.pow(t2, t1));
"hello ".concat(Math.pow(t1, t2) + t1, " hello world ").concat(Math.pow(t1, t2) + t1);
"hello ".concat(t1 + Math.pow(t2, t2) + t1, " hello world ").concat(t1 + Math.pow(t2, t2) + t1);
"hello ".concat(swcHelpers.typeOf(Math.pow(t1, Math.pow(t2, t1))), " hello world ").concat(swcHelpers.typeOf(Math.pow(t1, Math.pow(t2, t1))));
