import React from 'react';
import {render, screen, fireEvent, act} from '@testing-library/react'

import { useHome } from '../pages';

const options = 1;

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
    const homeHook = setup({ onClick: () => {} });

    act(() => {
      homeHook.toggleModal();
    })

    expect(homeHook.isOpen).toEqual(true);
  });
});
