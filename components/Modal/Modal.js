import React, { useState } from 'react';

import styles from '../../styles/Modal.module.scss';

export const useModal = () => {
  const [showAll, setShowAll] = useState(false);

  const toggleDescription = () => {
    setShowAll(!showAll);
  }
  return {
    showAll,
    toggleDescription
  }
}

export const Modal = (props) => {
  const { current, config } = props;

  const { showAll, toggleDescription } = useModal();

  return (
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        {current?.name}
        <span style={ { backgroundColor: current?.tag.color }} >{current?.tag.name}</span>
      </div>

      <div className={styles.content}>
        {
          current && current.description.length < 181
          ? current && current.description
          : current && !showAll
            ? `${current.description.substring(0, 181)}... ` 
            : current?.description
        }

        {
          current && !showAll && current.description.length >= 181
          ? (<span className={styles.toggle} onClick={toggleDescription}>(Show more)</span>)
          : current && showAll && current.description.length >= 181
            ? (<span className={styles.toggle} onClick={toggleDescription}>(Show less)</span>)
            : ''
        }
        
      </div>

      <div className={styles.scores}>
        <div className="row">
          <div className="col text-center">
            <span className={styles.displayScore}>{current?.x}</span>
          </div>
          <div className="col text-center">
            <span className={styles.displayScore}>{current?.y}</span>
          </div>
        </div>
        <div className="row">
          <div className={`col text-center ${styles.labels}`}>
            {config?.xAxis}
          </div>
          <div className={`col text-center ${styles.labels}`}>
            {config?.yAxis}
          </div>
        </div>
      </div>

      {/* <div className={styles.footer}></div> */}

    </div>
  )
}