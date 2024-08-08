import DataItem from "../Utils/IDataItem";
import IItemCosts from "../Utils/IItemCosts";

function calculateMaterials(data: DataItem[], itemCosts: IItemCosts): { materials: Map<string, number>, otherItems: DataItem[] } {
    const materialsCost = new Map<string, number>();
    const otherItems: DataItem[] = [];

    data.forEach(item => {
        const words = item.name.split(' ');

        let material = '';
        let type = '';

        // Попытка найти материал из двух слов и тип из оставшихся
        for (let i = 1; i <= 2; i++) {
            const potentialMaterial = words.slice(0, i).join(' ');
            const potentialType = words.slice(i).join(' ');

            if (itemCosts[potentialType]) {
                material = potentialMaterial;
                type = potentialType;
                break;
            }
        }

        // Если тип изделия распознан, считаем стоимость
        if (type) {
            const costPerUnit = itemCosts[type];
            const totalCost = item.value * costPerUnit;

            if (materialsCost.has(material)) {
                materialsCost.set(material, materialsCost.get(material)! + totalCost);
            } else {
                materialsCost.set(material, totalCost);
            }
        } else {
            // Если тип изделия не распознан, сохраняем предмет как есть
            otherItems.push(item);
        }
    });

    return { materials: materialsCost, otherItems };
}

export default calculateMaterials; 