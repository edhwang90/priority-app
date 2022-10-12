import React from 'react';
import {render, act} from '@testing-library/react'

import { useModal } from '../components/Modal/Modal.js';

const setup = (args) => {
  const returnVal = {};

  const TestComponent = () => {
    Object.assign(returnVal, useModal(args));
    return null;
  }

  render(<TestComponent></TestComponent>);
  return returnVal;
}

describe('Modal', () => {

  it('toggles description', () => {
    const modalHook = setup();

    act(() => {
      modalHook.toggleDescription();
    })

    expect(modalHook.showAll).toEqual(true);
  });
});
