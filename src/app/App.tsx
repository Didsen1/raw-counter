import React, { useState } from 'react';
import styles from "./App.module.scss"
import WoodCounter from '../WoodCounter/WoodCounter';
import BricksCounter from '../BricksCounter/BricksCounter';
import { Value } from 'sass';

function App() {

  const [inputData, setInputData] = useState('');
  const [log, setLog] = useState<{ materials: Map<string, number>, otherItems: any[] } | null>(null);
  const [cobble, setCobble] = useState<{ materials: Map<string, number>, otherItems: any[] } | null>(null);
  let result: any[] = [];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      result = parseData(inputData);

      const woodResult = WoodCounter(result);
      const brickResult = BricksCounter(result);

      setLog(woodResult);
      setCobble(brickResult);

    }
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

  console.log(log?.materials)
  console.log(cobble?.materials)

  return (
    <div className={styles.App}>
      <div className={styles.App__Container}>
        <textarea className={styles.App__textArea}
          value={inputData} placeholder='Вставьте сюда данные для расчета'
          onKeyDown={handleKeyDown} onChange={(e) => setInputData(e.target.value)}></textarea>
        <p>Чтобы активировать скрипт вставьте материалы на английском из файлика схематики и нажать Enter</p>
      </div>
      <div className={styles.App__Container}>
        <div>
          {Array.from(log?.materials.entries() || []).map(([key, value], index) => (
            <p key={index}>{`${key} Log : ${Math.ceil(value)}`}</p>
          ))}
          {Array.from(cobble?.materials.entries() || []).map(([key, value], index) => (
            <p key={index}>{`${key} Cobble: ${Math.ceil(value)}`}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
