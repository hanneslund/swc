import * as swcHelpers from "@swc/helpers";
// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts
var React = require("react");
export default function Component(props) {
    return /*#__PURE__*/ React.createElement(AnotherComponent, swcHelpers.extends({}, props, {
        property2: true,
        AnotherProperty1: "hi"
    }));
};
function AnotherComponent(param) {
    var property1 = param.property1;
    return /*#__PURE__*/ React.createElement("span", null, property1);
}
