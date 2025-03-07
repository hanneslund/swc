import * as swcHelpers from "@swc/helpers";
// @module: system
// @target: esnext
// @useDefineForClassFields: false
// @filename: 0.ts
export class B {
    print() {
        return "I am B";
    }
}
export function foo() {
    return "foo";
}
// @filename: 1.ts
export function backup() {
    return "backup";
}
class C {
    method() {
        const loadAsync = import("./0");
        this.myModule.then((Zero)=>{
            console.log(Zero.foo());
        }, function() {
            var _ref = swcHelpers.asyncToGenerator(function*(err) {
                console.log(err);
                let one = yield import("./1");
                console.log(one.backup());
            });
            return function(err) {
                return _ref.apply(this, arguments);
            };
        }());
    }
    constructor(){
        this.myModule = import("./0");
    }
}
export class D {
    method() {
        const loadAsync = import("./0");
        this.myModule.then((Zero)=>{
            console.log(Zero.foo());
        }, function() {
            var _ref = swcHelpers.asyncToGenerator(function*(err) {
                console.log(err);
                let one = yield import("./1");
                console.log(one.backup());
            });
            return function(err) {
                return _ref.apply(this, arguments);
            };
        }());
    }
    constructor(){
        this.myModule = import("./0");
    }
}
