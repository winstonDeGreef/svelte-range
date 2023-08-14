# Svelte-range
A simple and robust library that implements a memory efficient range function inspired by Python's range.
It works by creating a Proxy that calculates the value of `range(10)[i]` when accessed. This value is not stored, making it use less memory.
The proxy also implements an iterator, so it can be used in for loops. (`for (let i of range(10)) ...`). This also makes debugging faulty ranges easier, because you can do `[...range(10)]` to get an array of the values. This also makes it future proof whenever svelte adds support for iterators in #each blocks.