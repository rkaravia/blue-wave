<script>
  import * as Replayable from "../Replayable";
  import { duration, delay } from "../../helpers/settings.js";
  import {
    addKeyframes,
    fadeInEnd,
    fadeOutStart
  } from "../../helpers/animations.js";

  export let stopsByColor;

  const height = 30;
  const width = 538;
  const dashes = 4;

  stopsByColor.forEach(item => {
    const { color, stops } = item;
    const keyframes = stops.map(({ offset, count }) => ({
      offset,
      value: getKeyframe(offset, count, color)
    }));
    const animation = addKeyframes(keyframes);
    item.barStyle = `animation: ${animation} ${duration}s ease-in-out ${delay}s both;`;
  });

  function getKeyframe(offset, count, color) {
    const rules = [`width: ${count}px;`];
    if (color === "red") {
      rules.push(`x: ${width - count}px;`);
    }
    return rules.join(" ");
  }
</script>

<style>
  svg {
    display: block;
    margin-bottom: 8px;
  }

  .bw-count {
    fill: currentColor;
    font-size: 20px;
    font-weight: bold;
  }

  .bw-count--blue {
    transform: translate(8px, 22px);
    text-anchor: start;
  }

  .bw-count--red {
    transform: translate(-8px, 22px);
    text-anchor: end;
  }
</style>

<svg viewBox="0 0 {width} {height}">
  <rect {width} {height} fill="var(--color-open)" />
  <Replayable.Animation>
    {#each stopsByColor as { barStyle, color, stops }, index}
      <rect fill="var(--color-{color}" {height} style={barStyle} />
      <g transform="translate({index * width})">
        <text class="bw-count bw-count--{color}" style={fadeOutStart}>
          {stops[0].count}
        </text>
        <text class="bw-count bw-count--{color}" style={fadeInEnd}>
          {stops[stops.length - 1].count}
        </text>
      </g>
    {/each}
  </Replayable.Animation>
  <line
    x1={width / 2}
    y1={0}
    x2={width / 2}
    y2={height}
    stroke="currentColor"
    stroke-dasharray={height / (2 * dashes - 1)} />
</svg>
