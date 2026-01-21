import { GRID_SIZE } from "../state/constants.js";

let snapEnabled = true;

export function snap(delta) {
  if (!snapEnabled) return delta;
  return Math.round(delta / GRID_SIZE) * GRID_SIZE;
}

export function setSnap(enabled) {
  snapEnabled = enabled;
}

export function isSnapEnabled() {
  return snapEnabled;
}

export function snapPosition(value) {
  if (!snapEnabled) return value;
  return Math.floor(value / GRID_SIZE) * GRID_SIZE;
}

export function snapSize(value) {
  if (!snapEnabled) return value;
  return Math.max(GRID_SIZE, Math.round(value / GRID_SIZE) * GRID_SIZE);
}
