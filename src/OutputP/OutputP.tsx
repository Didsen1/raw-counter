import React from "react"
import styles from "./OutputP.module.scss"


const OutputP = ({ index, name, value, stackLimit, chestFlag, itemType }: { index: number, name: string, value: number, stackLimit: number, chestFlag: boolean, itemType: string }) => {
    const RawVulue = value;
    let stack = null
    let chest = null

    if (RawVulue > stackLimit) {
        stack = RawVulue / stackLimit
    }

    if (chestFlag && stack != null && stack > 32) {
        chest = stack / 32;
    }

    return (
        <p className={styles.OutputP} key={index}>{`${name} ${itemType}:`} <br />
            {`Штук: ${Math.ceil(RawVulue)}`} {stack ? `/ Стаков: ${stack.toFixed(1)}` : " "}  {chest ? `/ Двойных сундуков: ${chest.toFixed(1)}` : ' '}</p>
    )
}

export default OutputP;