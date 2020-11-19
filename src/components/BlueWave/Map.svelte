<script>
  import Hexagon from "./Hexagon.svelte";
  import * as settings from "../../helpers/settings.js";

  import * as Replayable from "../Replayable";

  export let bounds;
  export let hexagons;
  export let lines;

  const padding = 2;
  const x = bounds.x.min - padding;
  const y = bounds.y.min - padding;
  const width = bounds.x.max + padding - x;
  const height = bounds.y.max + padding - y;

  function animateWave() {
    const margin = 5;
    const speed = (bounds.x.max - bounds.x.min) / settings.duration;
    const from = bounds.x.min - margin;
    const to = bounds.x.max + margin;
    const distance = to - from;
    const delay = settings.delay - margin / speed;
    const duration = distance / speed;
    return `
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
      --translate-from: ${from}px;
      --translate-to: ${to}px;`;
  }
</script>

<style>
  svg {
    display: block;
    margin-bottom: 16px;
  }

  @keyframes wave {
    0% {
      transform: translateX(var(--translate-from));
    }
    100% {
      transform: translateX(var(--translate-to));
    }
  }

  .bw-wave {
    animation: wave linear both;
  }
</style>

<svg viewBox="{x} {y} {width} {height}">
  <defs>
    <filter id="blur" filterUnits="userSpaceOnUse">
      <feGaussianBlur stdDeviation="0.5" />
    </filter>
  </defs>
  <Replayable.Animation>
    {#each hexagons as hexagon}
      <Hexagon {hexagon} />
    {/each}
    {#each lines as [p1, p2]}
      <line
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
        stroke="currentColor"
        stroke-width="0.1"
        stroke-linecap="round" />
    {/each}
    <line
      class="bw-wave"
      y1={y + padding}
      y2={y + height - padding}
      stroke="var(--color-blue)"
      stroke-width="1"
      style={animateWave()}
      filter="url(#blur)" />
  </Replayable.Animation>
</svg>
