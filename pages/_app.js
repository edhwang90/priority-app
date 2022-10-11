import React from 'react';
import { Header } from '../components/Header/Header.js';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>

      <Header></Header>
      <Component {...pageProps} />

      <div className="footer"></div>
    </React.Fragment>
  )
}

export default MyApp
