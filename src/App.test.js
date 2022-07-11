import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';
import SearchBar from './components/SearchBar';
import LoginPage from './components/LoginPage';

import App from './App';

describe("Search Bar component", () => {
  it("renders correct heading", () => {
    const {getByRole} = render(<SearchBar />);
    expect(getByRole("heading").textContent).toMatch(/Ticker Search/i);
  });
});


describe("Login page", () => {
  it("renders login page", () =>{
    const { container } = render(<LoginPage />);
    expect(container).toMatchSnapshot();
  });
});

describe("Search bar input", () => {
  it("calls onChange correct number of times", () => {
    const onChangeMock = jest.fn();
    render(<SearchBar handleChange={onChangeMock} />);
    const input = screen.getByRole("textbox");

    userEvent.type(input, "VTI");

    expect(onChangeMock).toHaveBeenCalledTimes(3);
  });

  it("input has correct values", () => {
    const onChangeMock = jest.fn();
    render(<SearchBar handleChange={onChangeMock} />);
    const input = screen.getByRole("textbox");

    userEvent.type(input, "GOOG");

    expect(input).toHaveValue("GOOG");
  })

})