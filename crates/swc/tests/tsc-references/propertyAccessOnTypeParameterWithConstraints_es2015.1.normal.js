// generic types should behave as if they have properties of their constraint type
// no errors expected 
class C {
    f() {
        var x;
        var a1 = x['getDate'](); // number
        return a1 + x.getDate();
    }
}
var r = new C().f();
var i;
var r2 = i.foo.getDate();
var r2b = i.foo['getDate']();
var a;
var r3 = a().getDate();
var r3b = a()['getDate']();
var b = {
    foo: (x)=>{
        var a2 = x['getDate'](); // number
        return a2 + x.getDate();
    }
};
var r4 = b.foo(new Date());
