import { fireEvent, render, screen } from "@testing-library/react";
import Footer from "../Footer";

const handleFilterMock = jest.fn();

describe("footer", () => {
  test("should display text 1 item left when the length of tasks is one", () => {
    render(<Footer itemsLeft={1} handleFilter={handleFilterMock} />);

    const countElement = screen.getByTestId("task-count");
    expect(countElement).toHaveTextContent("1 item left");
  });

  test("should display items left when the length of tasks is greater than one", () => {
    render(<Footer itemsLeft={3} handleFilter={handleFilterMock} />);

    const countElement = screen.getByTestId("task-count");
    expect(countElement).toHaveTextContent("3 items left");
  });

  test("should call show active task filter when button is clicked", () => {
    render(<Footer itemsLeft={3} handleFilter={handleFilterMock} />);
    const activeBtn = screen.getByText("Active");
    fireEvent.click(activeBtn);
    expect(handleFilterMock).toHaveBeenCalledWith("ACTIVE");
  });

  test("should call show completed task filter when button is clicked", () => {
    render(<Footer itemsLeft={3} handleFilter={handleFilterMock} />);

    const completedBtn = screen.getByText("Completed");
    fireEvent.click(completedBtn);
    expect(handleFilterMock).toHaveBeenCalledWith("COMPLETED");
  });
});
