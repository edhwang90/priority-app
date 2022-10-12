import React from 'react';
import {render, act} from '@testing-library/react'

import { useHome } from '../pages';

const setup = (args) => {
  const returnVal = {};

  const TestComponent = () => {
    Object.assign(returnVal, useHome(args));
    return null;
  }

  render(<TestComponent></TestComponent>);
  return returnVal;
}

describe('Home', () => {

  it('toggles modal', () => {
    const homeHook = setup();

    act(() => {
      homeHook.toggleModal();
    })

    expect(homeHook.isOpen).toEqual(true);
  });
});
