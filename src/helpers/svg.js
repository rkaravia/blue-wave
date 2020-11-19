function reducePrecision(c) {
  return Math.round(c * 1000) / 1000;
}

export function formatPoint({ x, y }) {
  return [x, y].map(reducePrecision).join();
}
