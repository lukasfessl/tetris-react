
export const GRID_WIDTH = 10;
export const GRID_WIDTH_START = 0;
export const GRID_WIDTH_END = GRID_WIDTH_START + GRID_WIDTH;

export const GRID_HEIGHT = 20;
export const GRID_HEIGHT_START = 0;
export const GRID_HEIGHT_END = GRID_HEIGHT_START + GRID_HEIGHT;

export const GRID_BLOCK_SIZE = 25;

export const GRID = new Array(GRID_HEIGHT).fill(0).map(() => new Array(GRID_WIDTH).fill(0));