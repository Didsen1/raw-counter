import IItemCosts from "../Utils/IItemCosts";
import calculateMaterials from "../СalculateMaterials/СalculateMaterials";

const WoodCounter = (parseData: any) => {

    const itemCosts: IItemCosts = {
        'Trapdoor': 0.75,
        'Planks Stairs': 0.25,
        'Planks Slab': 0.25,
        'Fence': 0.28125,
        'Planks': 0.5,
        'Ladder': 0.052734375,
    };

    const woodCost = calculateMaterials(parseData, itemCosts)

    return woodCost;
}

export default WoodCounter;