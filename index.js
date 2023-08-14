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
    if (Math.floor(start) !== start) console.warn("start is not a whole number. This could cause unexpected behavior because floating point numbers are a bit weird. ie svelteRange(0.5, 0.8, 0.1) will return [0.5, 0.6, 0.7, 0.8] instead of [0.5, 0.6, 0.7] because 0.5 + 0.1 + 0.1 + 0.1 = 0.7999999999999999 which is less than 8.")
    if (Math.floor(step) !== step) console.warn("step is not a whole number. This could cause unexpected behavior because floating point numbers are a bit weird. ie svelteRange(0.5, 0.8, 0.1) will return [0.5, 0.6, 0.7, 0.8] instead of [0.5, 0.6, 0.7] because 0.5 + 0.1 + 0.1 + 0.1 = 0.7999999999999999 which is less than 8.")
    if (Math.floor(stop) !== stop) console.warn("stop is not a whole number. This could cause unexpected behavior (BUT LESS BECAUSE svelteRange DOES NOT DO ANY MATH WITH STOP, ONLY COMPARISON) because floating point numbers are a bit weird. ie svelteRange(0.5, 0.8, 0.1) will return [0.5, 0.6, 0.7, 0.8] instead of [0.5, 0.6, 0.7] because 0.5 + 0.1 + 0.1 + 0.1 = 0.7999999999999999 which is less than 8.")
    
    let length = 0
    if (step === 0) length = [0, Infinity][Number(start !== stop)]
    else length = Math.max(Math.ceil(Math.abs(stop - start) / step), 0)
    

    return new Proxy([], {
        get: (t, prop) => {
            if (prop === "length") return length
            if (prop === "toString") return () => `Svelte Range{${start} ${stop} ${step}}`
            if (prop === Symbol.iterator) return function* () {
                for (let i = 0; i < length; i++) {
                    yield start + i * step
                }
            }
            if (prop in Array.prototype) throw new TypeError("Array methods (except toString and @@iterator) are not supported")

            let index = Number.parseFloat(prop)
            if (Number.isNaN(index) || Math.ceil(index) !== index) return undefined
            if (index >= length) return undefined
            return start + index * step
        }
    })
}

module.exports = svelteRange