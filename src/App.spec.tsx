import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { App } from './App';

test('renders the text "Mondrian"', () => {
  const { getByText } = render(<App />);
  expect(getByText('Mondrian')).toBeInTheDocument();
});