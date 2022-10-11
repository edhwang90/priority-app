import React, { useState, useRef, useEffect } from 'react';
import { Bubble, getElementsAtEvent } from 'react-chartjs-2';
import styles from '../styles/Home.module.scss';
import { Grid } from '../components/Grid/Grid.js';
import { Modal } from '../components/Modal/Modal.js';
//import annotationPlugin from 'chartjs-plugin-annotation';
import FakeData from '../_data/FakeData.json';
import FakeConfig from '../_data/FakeConfig.json';

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

export const useHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(null)
  const [fakeLabelData, setFakeLabelData] = useState();
  const [fakedData, setFakedData] = useState();

  const [chartOptions, setChartOptions] = useState();
  const [bubbleConfig, setBubbleConfig] = useState(
    {
      datasets: [
        {
          label: 'A dataset',
          fill: false,
          data: [],
          //backgroundColor: ['red', 'blue'] // has to match order of data.
        },
      ]
    });

  const chartRef = useRef();

  // Modal Open/Close
  useEffect(() => {
    if (current) {
      toggleModal();
    }
    else {
      toggleModal(true);
    }
  }, [current])

  const getFakeData = (isLabels = false) => {
    if (!isLabels) {
      setFakedData(FakeData);

      const fetchBubbleConfig = {
        datasets: [
          {
            label: 'Tasks',
            data: FakeData,
            backgroundColor: ['#4d4d4d']
          }
        ]
      }

      setBubbleConfig(fetchBubbleConfig);
    }
    else {
      setFakeLabelData(FakeConfig);

      setChartOptions(
        {
          legend: {
          display: false
          },
          scales: {
            xAxes: {
              // position: 'center',
              grid: {
                display: false
              },
              title: {
                display: true,
                text: FakeConfig.xAxis,
                align: 'start'
              }
            },
            yAxes: {
              // position: 'center',
              grid: {
                display: false
              },
              title: {
                display: true,
                text: FakeConfig.yAxis,
                align: 'start'
              }
            },
          }
        }
      )
    }
  };

  // initial data
  useEffect(() => {
    getFakeData();
    getFakeData(true);
  }, []);

  const toggleModal = (toClose = false) => {
    if (toClose) {
      setIsOpen(false);
    } else {
      setIsOpen(prevState => {
        return !prevState
      })
    }
  }

  const handleClick = (e) => {
    const point = getElementsAtEvent(chartRef.current, e);

    if (point[0]) {
      setCurrent(JSON.parse(JSON.stringify(point[0].element.$context.raw)));
    }
    else {
      setCurrent(null);
    }
  }

  return {
    toggleModal,
    handleClick,
    getFakeData,
    fakeLabelData,
    fakedData,
    isOpen,
    current,
    chartRef,
    bubbleConfig,
    chartOptions
  }
}

export const Home = () => { 
  const { toggleModal,
    handleClick,
    isOpen,
    current,
    fakeLabelData,
    fakedData,
    bubbleConfig,
    chartOptions,
    chartRef } = useHome();

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

  return (
    <div className="row content">
      <div className="col">
        <h4 className={styles.subHeader}>Example Priority Grid</h4>

        <Grid data={fakedData} config={fakeLabelData}></Grid>
      </div>
      <div className={`col ${styles.modalContainer}`}>
        <h4 className={styles.subHeader}>Example Priority Chart</h4>

        <Bubble 
          className="bubble-plot"
          ref={chartRef}
          options={chartOptions}
          onClick={handleClick}
          data={bubbleConfig}></Bubble>

        {
        isOpen 
          ?
            ( 
              <Modal current={current} config={fakeLabelData}></Modal>
              // <div className="modal">
              //   modal specific info: { current ? current.name : '' }
              // </div>
            )
          : ''
        }
      </div>
    </div>
  )
}

export default Home;