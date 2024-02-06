"use client";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { uuid } from "uuidv4";
import styles from "./AddTodo.module.scss";
interface taskType {
  id: string;
  name: string;
  isCompleted: boolean;
}
interface AddTodoType {
  addTask: (task: taskType) => void;
}

const AddTodo: React.FC<PropsWithChildren<AddTodoType>> = ({ addTask }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [task, setTask] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!inputRef.current?.value) return;

    addTask({
      id: uuid(),
      name: task,
      isCompleted: false,
    });
    setTask("");
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <input
        type="text"
        placeholder="Create a new todo..."
        ref={inputRef}
        value={task}
        onChange={(ev) => setTask(ev.target.value)}
        className={styles.formContainer__input}
      />
    </form>
  );
};

export default AddTodo;
