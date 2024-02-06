import { TaskType } from "@/app/page";
import { Draggable } from "@hello-pangea/dnd";
import Image from "next/image";
import { PropsWithChildren } from "react";
import XIcon from "../../../../public/assets/icon-cross.svg";
import styles from "./TodoItem.module.scss";

interface TodoItemTypes {
  task: TaskType;
  index: number;
  markAsCompleted: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TodoItem: React.FC<PropsWithChildren<TodoItemTypes>> = ({
  task,
  index,
  markAsCompleted,
  deleteTask,
}) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={styles.taskContainer}
        >
          <label
            className={`${styles.taskContainer__inputLabel} ${
              task.isCompleted ? styles.taskContainer__done : ""
            }`}
          >
            <input
              type="checkbox"
              onClick={() => markAsCompleted(task.id)}
              checked={task.isCompleted}
            />
            {task.name}
          </label>
          <button
            className={styles.taskContainer__btn}
            data-testid="delete-btn"
            onClick={() => deleteTask(task.id)}
          >
            <Image src={XIcon} alt="x icon" />
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default TodoItem;
