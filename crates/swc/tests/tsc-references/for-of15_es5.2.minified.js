import * as swcHelpers from "@swc/helpers";
var _iterator = Symbol.iterator, StringIterator = function() {
    "use strict";
    function StringIterator() {
        swcHelpers.classCallCheck(this, StringIterator);
    }
    var _proto = StringIterator.prototype;
    return _proto.next = function() {
        return "";
    }, _proto[_iterator] = function() {
        return this;
    }, StringIterator;
}(), _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
try {
    for(var _step, _iterator1 = (new StringIterator)[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator1.next()).done); _iteratorNormalCompletion = !0)_step.value;
} catch (err) {
    _didIteratorError = !0, _iteratorError = err;
} finally{
    try {
        _iteratorNormalCompletion || null == _iterator1.return || _iterator1.return();
    } finally{
        if (_didIteratorError) throw _iteratorError;
    }
}
