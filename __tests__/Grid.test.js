import React from 'react';
import {render, act} from '@testing-library/react'

import { useGrid } from '../components/Grid/Grid.js';

const setup = (args) => {
  const returnVal = {};

  const TestComponent = () => {
    Object.assign(returnVal, useGrid(args));
    return null;
  }

  render(<TestComponent></TestComponent>);
  return returnVal;
}

describe('Grid', () => {

  it('sets X score background fill', () => {
    const fakeConfig = {
      xAxis: "Effort",
      yAxis: "Value",
      maxYbetter: "true"
    }

    const gridHook = setup(fakeConfig);
    const rendered = gridHook.scoreFill(9);
    
    // score (4) * 10
    expect(rendered.props.style.width).toEqual(90);
    
    // score should be red
    expect(rendered.props.style.backgroundColor).toEqual('#FFA99C');
    expect(rendered.props.className).toEqual('scoreFill');
  });

  it('sets Y score background fill', () => {
    const fakeConfig = {
      xAxis: "Effort",
      yAxis: "Value",
      maxYbetter: "true"
    }

    const gridHook = setup(fakeConfig);
    const rendered = gridHook.scoreFill(9, false);

    // score (4) * 10
    expect(rendered.props.style.width).toEqual(90);

    // score should be green
    expect(rendered.props.style.backgroundColor).toEqual('#B1FF9C');
    expect(rendered.props.className).toEqual('scoreFill');
  });
});
