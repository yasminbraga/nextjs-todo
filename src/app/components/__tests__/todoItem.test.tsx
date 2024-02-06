import { fireEvent, render, screen } from "@testing-library/react";
import TodoItem from "../TodoItem";

const mockedTask = {
  id: "1234",
  name: "compras",
  isCompleted: false,
};

const markAsCompleted = jest.fn();
const deleteTodo = jest.fn();
let renderUtils;

describe("Todo Item", () => {
  beforeEach(() => {
    renderUtils = render(
      <TodoItem
        task={mockedTask}
        markAsCompleted={markAsCompleted}
        deleteTask={deleteTodo}
      />
    );
  });

  afterEach(() => {
    markAsCompleted.mockClear();
    deleteTodo.mockClear();
  });

  test("should mark as completed when clicked on checkbox", () => {
    const checkbox = screen.getByLabelText(mockedTask.name);
    fireEvent.click(checkbox);

    expect(markAsCompleted).toHaveBeenCalledTimes(1);
    expect(markAsCompleted).toHaveBeenCalledWith(mockedTask.id);
    expect(checkbox).toBeChecked();
  });

  test("should delete task when click on delete button", () => {
    const deleteBtn = screen.getByTestId("delete-btn");
    fireEvent.click(deleteBtn);

    expect(deleteTodo).toHaveBeenCalledTimes(1);
    expect(deleteTodo).toHaveBeenCalledWith(mockedTask.id);
  });
});
