<script context="module">
  import * as settings from "../../helpers/settings.js";
  import { formatPoint } from "../../helpers/svg.js";

  const size = 0.97;

  const points = Array.from({ length: 6 }, (_, index) => {
    const angle = ((index - 0.5) * Math.PI) / 3;
    const x = size * Math.cos(angle);
    const y = size * Math.sin(angle);
    return formatPoint({ x, y });
  }).join(" ");
</script>

<script>
  export let hexagon;
  const { id, pixelPosition, offset, label, colorFrom, colorTo } = hexagon;

  const transform = `translate(${formatPoint(hexagon.pixelPosition)})`;

  const colorChangeDelay = settings.delay + settings.duration * offset;
  const flipDelay = colorChangeDelay - settings.flipDuration / 2;
</script>

<style>
  @keyframes change-color {
    0% {
      color: var(--color-from);
    }
    100% {
      color: var(--color-to);
    }
  }

  g {
    animation: change-color 0s both;
  }

  polygon {
    fill: currentColor;
  }

  @keyframes flip {
    0% {
      transform: scaleX(1);
    }
    50% {
      transform: scaleX(0);
    }
    100% {
      transform: scaleX(1);
    }
  }

  .bw-flip {
    animation: flip ease-in-out;
  }
</style>

<g
  {transform}
  style="animation-delay: {colorChangeDelay}s; --color-from: var(--color-{colorFrom});
  --color-to: var(--color-{colorTo});">
  <polygon
    class:bw-flip={colorFrom !== colorTo}
    {points}
    style="animation-delay: {flipDelay}s; animation-duration: {settings.flipDuration}s" />
</g>

{#if label}
  <text
    {transform}
    fill="currentColor"
    font-size="0.8"
    font-weight="bold"
    text-anchor="middle"
    y="0.28">
    {label}
  </text>
{/if}
