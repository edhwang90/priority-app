import React from "react";

import styles from '../../styles/Grid.module.scss';

export const useGrid = (config) => {

  const scoreFill = (score, isX = true) => {
    let start = '#FFA99C';
    let end = '#B1FF9C';
    const middle = '#FFFC9C';

    if (config.maxYbetter === "false") {
      start = '#B1FF9C';
      end = '#FFA99C';
    }

    if (!isX) {
      if (score > 6) {
        return (<span className={styles.scoreFill} style={{backgroundColor: end, width: score*10 }}></span>)
      }
      else if (score > 3 && score <= 6) {
        return (<span className={styles.scoreFill} style={{backgroundColor: middle, width: score*10 }}></span>)
      }
      else {
        return (<span className={styles.scoreFill} style={{backgroundColor: start, width: score*10 }}></span>)
      }
    }
    else {
      if (score > 6) {
        return (<span className={styles.scoreFill} style={{backgroundColor: start, width: score*10 }}></span>)
      }
      else if (score > 3 && score <= 6) {
        return (<span className={styles.scoreFill} style={{backgroundColor: middle, width: score*10 }}></span>)
      }
      else {
        return (<span className={styles.scoreFill} style={{backgroundColor: end, width: score*10 }}></span>)
      }
    }

  }

  return {
    scoreFill
  }
}

export const Grid = (props) => {
  const { data, config } = props;
  const { scoreFill } = useGrid(config);

  return (
    <div className={styles.table}>
      <div className={styles.tableHeader}>
        <div className={`row ${styles.gridRow}`}>
          <div className={`col ${styles.gridCol} ${styles.fixed} ${styles.large}`}>Name</div>
          <div className={`col flex-grow ${styles.gridCol}`}>Description</div>
          <div className={`col fixed text-center ${styles.gridCol}`}>{ config?.xAxis }</div>
          <div className={`col fixed text-center ${styles.gridCol}`}>{ config?.yAxis }</div>
        </div>
        
      </div>
      <div className={styles.tableContent}>
        {
          data && data.length > 0
          ?
            data.map((dataItem, index) => (
              <div key={`ptb-${index}`} className={`row ${styles.gridRow}`}>
                <div className={`col ellipsis small ${styles.gridCol} ${styles.fixed} ${styles.large}`}>{ dataItem.name }</div>
                <div className={`col ellipsis flex-grow ${styles.gridCol}`}>{ dataItem.description }</div>
                <div className={`col fixed text-center ${styles.gridCol}`}>
                  { scoreFill(dataItem.chosenX.value) }
                  { dataItem.chosenX.value }
                </div>
                <div className={`col fixed text-center ${styles.gridCol}`}>
                  { scoreFill(dataItem.chosenY.value, false) }
                  { dataItem.chosenY.value }
                </div>
              </div>
            ))
          : (
            <div className={styles.tableFooter}>
              <div className="row">
                <div className={`col ${styles.emptyRow}`}>
                  No results.
                </div>
              </div>  
            </div>
          )

        }
      </div>
    </div>
  )
}