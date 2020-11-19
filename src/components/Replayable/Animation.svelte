<script>
  import { getReplayCount } from "./Context.svelte";
  import { afterUpdate } from "svelte";

  const replayCount = getReplayCount();

  let running = false;

  $: {
    $replayCount;
    running = false;
  }

  afterUpdate(() => {
    running = true;
  });
</script>

{#if running}
  <slot />
{/if}
