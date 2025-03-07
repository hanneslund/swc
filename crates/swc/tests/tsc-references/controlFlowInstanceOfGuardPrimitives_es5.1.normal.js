import * as swcHelpers from "@swc/helpers";
function distinguish(thing) {
    if (swcHelpers._instanceof(thing, Object)) {
        console.log("Aha!! It's a Date in " + thing.getFullYear());
    } else if (typeof thing === "string") {
        console.log("Aha!! It's a string of length " + thing.length);
    } else {
        console.log("Aha!! It's the number " + thing.toPrecision(3));
    }
}
distinguish(new Date());
distinguish("beef");
distinguish(3.14159265);
