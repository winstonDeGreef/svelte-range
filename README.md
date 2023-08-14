# svlete-range
A memory efficient python-style range function for svelte each blocks. It sets the length property to the correct integer and uses a proxy to calculate indexes when requested and does not store all the values. The proxy also implements an iterator, so it can be used in for loops. (`for (let i of range(10)) ...`). This also makes debugging faulty ranges easier, because you can do `[...range(10)]` to get an array of the values. This also makes it future proof whenever svelte adds support for iterators in #each blocks.

# usage
```svelte
<script>
    import range from "svelte-range"
</script>
{#each range(5) as i} {i} {/each}
<!-- => 0 1 2 3 4 -->

{#each range(3, 6) as i} {i} {/each}
<!-- => 3 4 5 -->

{#each range(-3, 10, 2) as i} {i} {/each}
<!-- => -3 -1 1 3 5 7 9 -->

{#each range(7, 4, -1) as i} {i} {/each}
<!-- 7 6 5 -->
```

# documentation
```typescript
function range(stop: number): number[]
// Equivalent to range(0, stop, 1)
// Although it claims to return an integer array,
//most methods on arrays are not implemented, and will throw an error.
// The implemented methods are: toString and @@iterator

function range(start: number, stop: number): number[]
// Equivalent to range(start, stop, 1)

function range(start: number, stop: number, step: number): number[]
// returns a proxy that emulates and array calculated by:
// start with start and continuously add step to it until we reach stop (or pass by it)

```