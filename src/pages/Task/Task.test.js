import React from "react";
import { render } from "@testing-library/react";
import Task from "./Task";
import Router from "../../routers/routers";

// const task = {
//     createdAt: "2021-02-24T04:39:31.391Z",
//     status: "Not started",
//     taskId: "123456",
//     taskName: "Testing",
//     user: "123456789",
// };

it("matches snapshot", () => {
  const { asFragment } = render(<Router><Task /></Router>);

  expect(asFragment()).toMatchSnapshot();
});

