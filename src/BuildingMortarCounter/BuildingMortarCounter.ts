import calculateMaterials from "../СalculateMaterials/СalculateMaterials";
import { MortarCosts } from "../Utils/ItemCostsLists";

const BuildingMortarCounter = (parseData: any) => {

    const mortarResult = new Map<string, number>();

    const mortarCost = calculateMaterials(parseData, MortarCosts)
    let allMortarCost = 0;

    Array.from(mortarCost?.materials.entries() || []).map(([key, value]) => (
        allMortarCost += value
    ));

    mortarResult.set("Строительного раствора", allMortarCost);
    mortarResult.set("Песока для строительного раствора", allMortarCost / 16);
    mortarResult.set("Флюса для известковой воды", allMortarCost / 16 / 1.25);
    mortarResult.set("Извести  для известковой воды", allMortarCost / 16 / 2.5);

    return mortarResult;
}

export default BuildingMortarCounter; 