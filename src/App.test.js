import React from "react";
import { render, screen } from '@testing-library/react';
import App from './App';
import Router from "./routers/routers";
import { get } from "js-cookie";

test('renders learn react link', () => {
  
  const {getByTestId} = render(<Router><App/></Router>);
  expect(getByTestId("app-container")).toBeInTheDocument();
});
