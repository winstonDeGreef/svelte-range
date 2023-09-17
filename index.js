function svelteRange(start, stop, step) {
    if (stop === undefined) {
        stop = start;
        start = 0;
    }
    if (step === undefined) {
        step = 1;
    }

    if (typeof start !== "number") throw new TypeError("start must be a number");
    if (typeof stop !== "number") throw new TypeError("stop must be a number or undefined");
    if (typeof step !== "number") throw new TypeError("step must be a number or undefined");
    if (Number.isNaN(start)) throw new TypeError("start must not be NaN");
    if (Number.isNaN(stop)) throw new TypeError("stop must not be NaN");
    if (Number.isNaN(step)) throw new TypeError("step must not be NaN");
    if (step === 0) throw new RangeError("step must not be 0");
    if (!Number.isFinite(start)) throw new RangeError("start must be finite");
    if (!Number.isFinite(stop)) throw new RangeError("stop must be finite");
    if (!Number.isFinite(step)) throw new RangeError("step must be finite");
    if (Math.floor(start) !== start) console.warn("start is not a whole number. This could cause unexpected behavior because floating point numbers are a bit weird. ie svelteRange(0.5, 0.8, 0.1) will return [0.5, 0.6, 0.7, 0.8] instead of [0.5, 0.6, 0.7] because the length of the range is calculated as (0.8 - 0.5) / 0.1 + 1 which is 4.0000000000000004 (although this is fixable, there might other floating point weirdness.")
    if (Math.floor(step) !== step) console.warn("step is not a whole number. This could cause unexpected behavior because floating point numbers are a bit weird. ie svelteRange(0.5, 0.8, 0.1) will return [0.5, 0.6, 0.7, 0.8] instead of [0.5, 0.6, 0.7] because the length of the range is calculated as (0.8 - 0.5) / 0.1 + 1 which is 4.0000000000000004 (although this is fixable, there might other floating point weirdness.")
    if (Math.floor(stop) !== stop) console.warn("stop is not a whole number. This could cause unexpected behavior because floating point numbers are a bit weird. ie svelteRange(0.5, 0.8, 0.1) will return [0.5, 0.6, 0.7, 0.8] instead of [0.5, 0.6, 0.7] because the length of the range is calculated as (0.8 - 0.5) / 0.1 + 1 which is 4.0000000000000004 (although this is fixable, there might other floating point weirdness.")
    
    let length = Math.max(Math.ceil(Math.abs(stop - start) / step), 0)
    

    return new Proxy([], {
        get: (t, prop) => {
            if (prop === "length") return length
            if (prop === "toString") return () => `Svelte Range{${start} ${stop} ${step}}`
            if (prop === Symbol.iterator) return function* () {
                for (let i = 0; i < length; i++) {
                    yield start + i * step
                }
            }
            if (prop in Array.prototype) throw new TypeError("Array methods (except toString and @@iterator) are not supported by svelte-range")

            let index = Number.parseFloat(prop)
            if (Number.isNaN(index) || Math.ceil(index) !== index) return undefined
            if (index >= length) return undefined
            return start + index * step
        },

        set: (t, prop, value) => {
            throw "setting properties is not supported on this object: svelte-range instance is immutable (although its type may say its array[]"
        },

        defineProperty: (t, prop, descriptor) => {throw "Object.defineProperty is not supported on this object: svelte-range instance is immutable (although its type may say its array[]"},

        deleteProperty: () => {throw "Object.deleteProperty is not supported on this object: svelte-range instance is immutable (although its type may say its array[]"},

        getOwnPropertyDescriptor: () => {throw "Object.getOwnPropertyDescriptor is not supported on this object: svelte-range instance does not implement this (although its type may say its array[]"},

        has: () => {throw "`x in object` is not supported on this object: svelte-range instance does not implement this (although its type may say its array[]"},
        isExtensible: () => {throw "Object.isExtensible is not supported on this object: svelte-range instance does not implement this (although its type may say its array[]"},

        ownKeys: () => {throw "Object.keys is not supported on this object: svelte-range instance does not implement this (although its type may say its array[]"},
        preventExtensions: () => {throw "Object.preventExtensions is not supported on this object: svelte-range instance does not implement this (although its type may say its array[]"},
        setPrototypeOf: () => {throw "Object.setPrototypeOf is not supported on this object: svelte-range instance does not implement this (although its type may say its array[]"}




    })
}

module.exports = svelteRange