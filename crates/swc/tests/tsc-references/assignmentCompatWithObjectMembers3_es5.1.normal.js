import * as swcHelpers from "@swc/helpers";
// members N and M of types S and T have the same name, same accessibility, same optionality, and N is assignable M
// additional optional properties do not cause errors
var S = function S() {
    "use strict";
    swcHelpers.classCallCheck(this, S);
};
var T = function T() {
    "use strict";
    swcHelpers.classCallCheck(this, T);
};
var s;
var t;
var s2;
var t2;
var a;
var b;
var a2 = {
    foo: ""
};
var b2 = {
    foo: ""
};
s = t;
t = s;
s = s2;
s = a2;
s2 = t2;
t2 = s2;
s2 = t;
s2 = b;
s2 = a2;
a = b;
b = a;
a = s;
a = s2;
a = a2;
a2 = b2;
b2 = a2;
a2 = b;
a2 = t2;
a2 = t;
