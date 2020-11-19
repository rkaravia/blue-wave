import { duration, delay } from "./settings.js";

const keyframesStyleSheet = document.head.appendChild(
  document.createElement("style")
).sheet;
const prefix = "bw-keyframes-";
let count = 0;

export const fadeOutStart = `animation: ${addKeyframes([
  {
    offset: 0.1,
    value: `opacity: 1;`,
  },
  {
    offset: 0.2,
    value: `opacity: 0;`,
  },
])} ${duration}s ${delay}s both;`;

export const fadeInEnd = `animation: ${addKeyframes([
  {
    offset: 0.8,
    value: `opacity: 0;`,
  },
  {
    offset: 0.9,
    value: `opacity: 1;`,
  },
])} ${duration}s ${delay}s both;`;

export function addKeyframes(keyframes) {
  if (keyframes[0].offset !== 0) {
    keyframes = [{ offset: 0, value: keyframes[0].value }, ...keyframes];
  }
  if (keyframes[keyframes.length - 1].offset !== 1) {
    keyframes = [
      ...keyframes,
      { offset: 1, value: keyframes[keyframes.length - 1].value },
    ];
  }
  const name = getKeyframesName();

  const rule = `
    @keyframes ${name} {
      ${keyframes
        .map(({ offset, value }) => `${offset * 100}% { ${value} }`)
        .join("\n")}
    }`;
  keyframesStyleSheet.insertRule(rule);

  return name;
}

function getKeyframesName() {
  return `${prefix}${count++}`;
}
