import * as swcHelpers from "@swc/helpers";
var C1 = function() {
    "use strict";
    function C1(x) {
        swcHelpers.classCallCheck(this, C1);
    }
    return C1.prototype.f = function(x) {}, C1;
}(), C2 = function() {
    "use strict";
    swcHelpers.classCallCheck(this, C2);
}, C3 = function() {
    "use strict";
    swcHelpers.classCallCheck(this, C3);
}, C4 = function() {
    "use strict";
    function C4() {
        var _this = this;
        swcHelpers.classCallCheck(this, C4), this.x1 = {
            a: this
        }, this.x2 = [
            this
        ], this.x3 = [
            {
                a: this
            }
        ], this.x4 = function() {
            return _this;
        };
    }
    var _proto = C4.prototype;
    return _proto.f1 = function() {
        return {
            a: this
        };
    }, _proto.f2 = function() {
        return [
            this
        ];
    }, _proto.f3 = function() {
        return [
            {
                a: this
            }
        ];
    }, _proto.f4 = function() {
        var _this = this;
        return function() {
            return _this;
        };
    }, C4;
}();
