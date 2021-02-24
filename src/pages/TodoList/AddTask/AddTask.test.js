import React from "react";
import {render, act, fireEvent} from "@testing-library/react";
import AddTask from "./AddTask";

describe("AddTask component", ()=>{
    const mockFunctionSubmit = jest.fn();
    const mockFunctionHandle = jest.fn();
    const task = ""

    it("shows input field with empty values", ()=>{
        const {getByTestId} = render(<AddTask submit={mockFunctionSubmit} handleChange={mockFunctionHandle} task={task}></AddTask>)
        expect(getByTestId("add-task-input").value).toBe("");
    })

    it("trigger even handler on input change", ()=>{
        const changedTask = "Some task";
        const {getByTestId, rerender} = render(
            <AddTask
                submit ={mockFunctionSubmit}
                handleChange = {mockFunctionHandle}
                task={task}
            ></AddTask>
        );

        act(()=>{
            fireEvent.change(getByTestId("add-task-input"), {
                target: {value: "Some task"}
            })
        });

        rerender(
            <AddTask
                submit ={mockFunctionSubmit}
                handleChange = {mockFunctionHandle}
                task={changedTask}
            ></AddTask>
        )
        expect(getByTestId("add-task-input").value).toBe("Some task");
        expect(mockFunctionHandle).toBeCalledTimes(1);
    })
    
})