import * as swcHelpers from "@swc/helpers";
function f1() {
    var f = function f() {
        var C = function C(x, y) {
            "use strict";
            swcHelpers.classCallCheck(this, C);
            this.x = x;
            this.y = y;
        };
        return C;
    };
    var C1 = f();
    var v = new C1(10, 20);
    var x1 = v.x;
    var y1 = v.y;
}
function f2() {
    var f = function f(x) {
        var C = function C(y) {
            "use strict";
            swcHelpers.classCallCheck(this, C);
            this.y = y;
            this.x = x;
        };
        return C;
    };
    var C2 = f(10);
    var v = new C2(20);
    var x2 = v.x;
    var y2 = v.y;
}
function f3() {
    var f = function f(x, y) {
        var C = function C() {
            "use strict";
            swcHelpers.classCallCheck(this, C);
            this.x = x;
            this.y = y;
        };
        return C;
    };
    var C3 = f(10, 20);
    var v = new C3();
    var x3 = v.x;
    var y3 = v.y;
}
