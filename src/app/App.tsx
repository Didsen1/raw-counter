import React, { useState } from 'react';
import styles from "./App.module.scss"
import WoodCounter from '../WoodCounter/WoodCounter';
import BricksCounter from '../BricksCounter/BricksCounter';
import BuildingMortarCounter from '../BuildingMortarCounter/BuildingMortarCounter';
import OutputP from '../OutputP/OutputP';

function App() {

  const [inputData, setInputData] = useState('');
  const [log, setLog] = useState<{ materials: Map<string, number>, otherItems: any[] } | null>(null);
  const [cobble, setCobble] = useState<{ materials: Map<string, number>, otherItems: any[] } | null>(null);
  const [mortar, setMortar] = useState<Map<string, number> | null>(null);
  let result: any[] = [];

  const handleKeyDown = () => {

    result = parseData(inputData);

    const woodResult = WoodCounter(result);
    const brickResult = BricksCounter(result);
    const mortarResult = BuildingMortarCounter(result)

    setLog(woodResult);
    setCobble(brickResult);
    setMortar(mortarResult);
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
          {mortar ?
            <div className={styles.App__OutputDiv}>
              <h2 className={styles.App__OutputTitle}>Для кипрпичей нужно: </h2>
              {Array.from(mortar.entries() || []).map(([name, value], index) => (
                <OutputP index={index} name={name} value={value} stackLimit={32} chestFlag={true} itemType={` `} />
              ))}
            </div>

            : " "}
        </div>
      </div>
      <button type='button' onClick={handleKeyDown} className={styles.App__button}>Обработать</button>
    </div>
  );
}

export default App;
