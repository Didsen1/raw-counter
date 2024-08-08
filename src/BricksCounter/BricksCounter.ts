import IItemCosts from "../Utils/IItemCosts";
import calculateMaterials from "../СalculateMaterials/СalculateMaterials";

const BricksCounter = (parseData: any) => {

    const itemCosts: IItemCosts = {
        'Bricks': 0.625,
        'Brick Wall': 0.625,
        'Brick Stairs': 0.625,
        'Brick Slab': 0.3125,
        'Button': 1,
    };

    const cobblestoneCost = calculateMaterials(parseData, itemCosts)
    return cobblestoneCost;
}

export default BricksCounter;