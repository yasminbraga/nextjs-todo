import { TaskType } from "@/app/page";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import TodoItem from "../TodoItem";
import styles from "./ListTasks.module.scss";

interface ListType {
  tasks: TaskType[];
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
  markAsCompleted: (id: string) => void;
  deleteTask: (id: string) => void;
}

const ListTasks: React.FC<PropsWithChildren<ListType>> = ({
  tasks,
  setTasks,
  ...props
}) => {
  const reorder = <T,>(list: T[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(tasks, result.source.index, result.destination.index);
    setTasks(items);
  };

  return (
    <section className={styles.listContainer}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks" type="list" direction="vertical">
          {(provided) => (
            <article ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => (
                <TodoItem key={task.id} task={task} {...props} index={index} />
              ))}

              {provided.placeholder}
            </article>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default ListTasks;
