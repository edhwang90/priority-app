import React from "react";

import styles from '../../styles/Header.module.scss';


export const Header = () => {

  return (
    <div className={styles.header}>
      <ul className={styles.links}>
        <li><a href="/about" title="About">About</a></li>
      </ul>

      <div className={styles.placeholder}></div>
    </div>
  )
}