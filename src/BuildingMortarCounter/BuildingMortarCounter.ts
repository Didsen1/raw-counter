import IItemCosts from "../Utils/IItemCosts";
import calculateMaterials from "../СalculateMaterials/СalculateMaterials";

const BuildingMortarCounter = (parseData: any) => {

    const itemCosts: IItemCosts = {
        'Bricks': 2,
        'Brick Wall': 1,
        'Brick Stairs': 2,
        'Brick Slab': 1,
    };

    const mortarCost = calculateMaterials(parseData, itemCosts)
    let allMortarCost = 0;

    Array.from(mortarCost?.materials.entries() || []).map(([key, value], index) => (
        allMortarCost += value
    ));

    console.log(`Всего нужно строительного раствора: ${allMortarCost}`)
    console.log(`Песка на строительный раствор нужно: ${Math.ceil(allMortarCost / 16)}`)
    // на 16 раствора надо 1 песок

    return allMortarCost;
}

export default BuildingMortarCounter; 