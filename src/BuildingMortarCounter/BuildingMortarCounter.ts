import IItemCosts from "../Utils/IItemCosts";
import calculateMaterials from "../СalculateMaterials/СalculateMaterials";

const BuildingMortarCounter = (parseData: any) => {

    const mortarResult = new Map<string, number>();

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


    mortarResult.set("Строительный раствор", allMortarCost);
    mortarResult.set("Песок для строительного раствора", allMortarCost / 16);
    mortarResult.set("Флюс для известковой воды", allMortarCost / 16 / 1.25);
    mortarResult.set("Известь  для известковой воды", allMortarCost / 16 / 2.5);

    return mortarResult;
}

export default BuildingMortarCounter; 