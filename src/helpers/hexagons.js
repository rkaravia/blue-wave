import input from "../data/hexagons.json";
import labels from "../data/labels.json";
import stateCodes from "../data/stateCodes.json";

const neighborOffsets = [
  [1, -1],
  [1, 0],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [0, -1],
];

export function getHexagonMap(data) {
  const hexagons = transformHexagons(input);
  const lines = getLines(hexagons);
  addLabels(hexagons);
  addCongressionalDistricts(hexagons);
  const bounds = getBounds(hexagons);
  addOffset(hexagons, bounds);
  const stopsByColor = getStops(hexagons, data);

  return { hexagons, lines, bounds, stopsByColor };
}

function transformHexagons(input) {
  return input.map((hexagon) => {
    const id = stateCodes[hexagon.id];
    const position = evenRToDoubledAxial(hexagon.position);
    const pixelPosition = doubledAxialToPixel(position);
    return { id, position, pixelPosition };
  });
}

function getLines(hexagons) {
  const hexagonsByPosition = {};
  hexagons.forEach(({ id, position }) => {
    hexagonsByPosition[key(position)] = id;
  });

  const linesByCenter = {};
  hexagons.forEach((hexagon) => {
    const { qd, rd } = hexagon.position;
    const center = doubledAxialToPixel({ qd, rd });
    neighborOffsets.forEach((n, index) => {
      const neighborId =
        hexagonsByPosition[key({ qd: qd + 2 * n[0], rd: rd + 2 * n[1] })];
      if (neighborId && neighborId !== hexagon.id) {
        const lineCenter = { qd: qd + n[0], rd: rd + n[1] };
        linesByCenter[key(lineCenter)] = [
          vertex(center, index - 1),
          vertex(center, index),
        ];
      }
    });
  });
  return Object.values(linesByCenter);
}

function addLabels(hexagons) {
  const labelCountsById = { ...labels };
  hexagons.forEach((hexagon) => {
    const { id } = hexagon;
    if (labelCountsById[id] === 0) {
      hexagon.label = id;
    }
    labelCountsById[id] -= 1;
  });
}

function addCongressionalDistricts(hexagons) {
  const statesWithCDs = {
    ME: 0,
    NE: 0,
  };

  hexagons.forEach((hexagon) => {
    const { id } = hexagon;
    const count = statesWithCDs[id];
    if (count !== undefined) {
      if (count >= 2) {
        hexagon.id = `${hexagon.id}CD${count - 1}`;
      }
      statesWithCDs[id] += 1;
    }
  });
}

function addOffset(hexagons, bounds) {
  hexagons.forEach((hexagon) => {
    hexagon.offset =
      (hexagon.pixelPosition.x - bounds.x.min) / (bounds.x.max - bounds.x.min);
  });
  hexagons.sort((a, b) => a.offset - b.offset);
}

function getStops(hexagons, { results2016, results2020 }) {
  let counts = {
    blue: 0,
    red: 0,
  };
  hexagons.forEach(({ id }) => {
    counts[results2016[id]] += 1;
  });
  const stopsByColor = [
    { color: "blue", stops: [] },
    { color: "red", stops: [] },
  ];
  let previousOffset = 0;
  hexagons.forEach((hexagon) => {
    const { id, offset } = hexagon;
    const result2016 = results2016[id];
    const result2020 = results2020[id];
    hexagon.colorFrom = result2016 || "open";
    hexagon.colorTo = result2020 || "open";
    if (result2020 !== results2016) {
      counts[result2016] -= 1;
      if (result2020) {
        counts[result2020] += 1;
      }
      if (offset - previousOffset > 1e-6) {
        stopsByColor.forEach(({ color, stops }) => {
          const count = counts[color];
          if (!stops.length || stops[stops.length - 1].count !== count) {
            stops.push({ offset, count });
          }
        });
        previousOffset = offset;
      }
    }
  });

  return stopsByColor;
}

function getBounds(hexagons) {
  return Object.fromEntries(
    ["x", "y"].map((dimension) => {
      const values = hexagons.map(
        ({ pixelPosition }) => pixelPosition[dimension]
      );
      const min = Math.min(...values);
      const max = Math.max(...values);
      return [dimension, { min, max }];
    })
  );
}

function key({ qd, rd }) {
  return `${qd}|${rd}`;
}

function evenRToDoubledAxial({ x, y }) {
  const q = x - (y + (y & 1)) / 2;
  const r = y;

  return {
    qd: 2 * q,
    rd: 2 * r,
  };
}

function doubledAxialToPixel({ qd, rd }) {
  return { x: (Math.sqrt(3) * qd) / 2 + (Math.sqrt(3) / 4) * rd, y: 0.75 * rd };
}

function vertex(center, index) {
  const angle = ((index - 0.5) * Math.PI) / 3;
  return { x: center.x + Math.cos(angle), y: center.y + Math.sin(angle) };
}
