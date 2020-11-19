<script context="module">
  import { getContext } from "svelte";

  const key = {};

  export function getReplayCount() {
    return getContext(key);
  }
</script>

<script>
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  const replayCount = writable(0);
  setContext(key, replayCount);

  export function replay() {
    replayCount.update(count => count + 1);
  }
</script>

<slot />
