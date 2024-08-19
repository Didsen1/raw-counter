import React, { useState } from 'react';
import styles from "./App.module.scss"
import BuildingMortarCounter from '../BuildingMortarCounter/BuildingMortarCounter';
import calculateMaterials from '../СalculateMaterials/СalculateMaterials';
import {LogCosts, BricksCosts} from '../Utils/ItemCostsLists';
import OutputP from '../OutputP/OutputP';
import DataItem from '../Utils/IDataItem';

function App() {

  const [inputData, setInputData] = useState('');
  const [log, setLog] = useState<{ materials: Map<string, number>, otherItems: (DataItem | null)[] } | null>(null);
  const [cobble, setCobble] = useState<{ materials: Map<string, number>, otherItems: (DataItem | null)[] } | null>(null);
  const [mortar, setMortar] = useState<Map<string, number> | null>(null);

  const handleKeyDown = () => {
    const result: any[] = parseData(inputData);
    setLog(calculateMaterials(result, LogCosts));
    setCobble(calculateMaterials(result, BricksCosts));
    setMortar(BuildingMortarCounter(result));
  };

  const parseData = (inputData: string) => {
    const lines = inputData.trim().split('\n');

    const result = lines.map(line => {
      const match = line.match(/^(.*?)(\d+)$/);

      if (match) {
        const [, name, value] = match;
        return {
          name: name.trim(),
          value: parseInt(value.trim(), 10)
        };
      }
      return null;
    });

    return result.filter(item => item !== null);
  };

  return (
    <div className={styles.App}>
      <div className={styles.App__wrapper}>
        <textarea className={`${styles.App__Container} ${styles.App__textArea}`}
          value={inputData} placeholder='Чтобы активировать скрипт вставьте материалы на английском из файлика схематики и нажмите кнопку' onChange={(e) => setInputData(e.target.value)} ></textarea>
        <div className={styles.App__Container}>
          {
            cobble ? <div className={styles.App__OutputDiv}>
              <h2 className={styles.App__OutputTitle}>Булыга: </h2>
              {Array.from(cobble?.materials.entries() || []).map(([name, value], index) => (
                <OutputP index={index} name={name} value={value} stackLimit={32} chestFlag={true} itemType={`Cobble`} />
              ))}
            </div>
              : " "
          }
          {mortar ?
            <div className={styles.App__OutputDiv}>
              <h2 className={styles.App__OutputTitle}>Для кирпичей нужно: </h2>
              {Array.from(mortar.entries() || []).map(([name, value], index) => (
                <OutputP index={index} name={name} value={value} stackLimit={32} chestFlag={true} itemType={` `} />
              ))}
            </div>

            : " "}
          {
            log ?
              <div className={styles.App__OutputDiv}>
                <h2 className={styles.App__OutputTitle}>Бревна: </h2>
                {Array.from(log?.materials.entries() || []).map(([name, value], index) => (
                  <OutputP index={index} name={name} value={value} stackLimit={16} chestFlag={false} itemType={`Log`} />
                ))}
              </div>
              : ' '
          }
        </div>
      </div>
      <button type='button' onClick={handleKeyDown} className={styles.App__button}>Обработать</button>
    </div>
  );
}

export default App;
