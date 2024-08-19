import IItemCosts from "./IItemCosts";

const PlanksMadeOfLog = 8;

const LogCosts: IItemCosts = {
    'Planks': 4 / PlanksMadeOfLog,
    'Trapdoor': 6 / PlanksMadeOfLog,
    'Planks Stairs': 4 / PlanksMadeOfLog,
    'Planks Slab': 2 / PlanksMadeOfLog,
    'Fence': (2 / PlanksMadeOfLog) + (1 / 32),
    'Ladder': (6 / 12) * (1 / PlanksMadeOfLog) + (3 / 12) * (1 / 32),
    'Fence Gate': (2 / PlanksMadeOfLog) + (4 / 32), 
    'Barrel': 7 / PlanksMadeOfLog 
};

const MortarCosts: IItemCosts = {
    'Bricks': 2,
    'Brick Wall': 1,
    'Brick Stairs': 2,
    'Brick Slab': 1,
};

const BricksCosts: IItemCosts = {
    'Bricks': 0.625,
    'Brick Wall': 0.625,
    'Brick Stairs': 0.625,
    'Brick Slab': 0.3125,
};

export {LogCosts, BricksCosts, MortarCosts};