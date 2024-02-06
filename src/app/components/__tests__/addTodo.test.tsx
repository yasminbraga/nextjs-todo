import { fireEvent, render, screen } from "@testing-library/react";
import AddTodo from "../AddTodo";

const addTaskMock = jest.fn();

jest.mock("uuidv4", () => {
  return { uuid: () => "1234" };
});

describe("AddTodo", () => {
  beforeEach(() => {
    render(<AddTodo addTask={addTaskMock} />);
  });

  afterEach(() => {
    addTaskMock.mockClear();
  });

  test("should contain input field and it should has focus on mount", () => {
    const inputField = screen.getByPlaceholderText("Create a new todo...");
    expect(inputField).toHaveFocus();
  });

  test("should not call add todo when field is empt", () => {
    const inputField = screen.getByPlaceholderText("Create a new todo...");
    fireEvent.submit(inputField);
    expect(addTaskMock).not.toHaveBeenCalled();
  });

  test("should call add funtion when input is not empt", () => {
    const inputField = screen.getByPlaceholderText("Create a new todo...");

    fireEvent.change(inputField, {
      target: { value: "compras" },
    });

    fireEvent.submit(inputField);

    expect(addTaskMock).toHaveBeenCalledTimes(1);
    expect(addTaskMock).toHaveBeenCalledWith({
      id: "1234",
      name: "compras",
      isCompleted: false,
    });
    expect(inputField).toHaveFocus();
    expect(inputField).toHaveValue("");
  });
});
