"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import styles from "./page.module.scss";

import { uuid } from "uuidv4";
import IconMoon from "../../public/assets/icon-moon.svg";
import IconSun from "../../public/assets/icon-sun.svg";
import Footer from "./components/Footer";
import ListTasks from "./components/ListTasks";
import { useTheme } from "./context/ThemeContext";

export interface TaskType {
  id: string;
  name: string;
  isCompleted: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [filter, setFilter] = useState<string>("ALL");
  const { isDarkMode, toggleTheme } = useTheme();

  const addTask = (task: TaskType) => {
    setTasks([...tasks, task]);
  };

  const markAsCompleted = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const deleteCompleted = () => {
    setTasks(tasks.filter((task) => !task.isCompleted));
  };

  const itemsLeft = tasks.filter((task) => !task.isCompleted).length;

  const handleFilter = (status: string) => {
    setFilter(status);
  };

  let filteredTasks;
  if (filter === "ACTIVE") {
    filteredTasks = tasks.filter((task) => !task.isCompleted);
  } else if (filter === "COMPLETED") {
    filteredTasks = tasks.filter((task) => task.isCompleted);
  } else {
    filteredTasks = tasks;
  }

  useEffect(() => {
    setTasks([
      { id: uuid(), name: "Natação", isCompleted: false },
      { id: uuid(), name: "Correr", isCompleted: false },
      { id: uuid(), name: "Estudar React", isCompleted: true },
    ]);
  }, []);

  return (
    <main className={styles.mainContainer}>
      <section className={styles.mainContainer__header}>
        <h1>todo</h1>
        <button
          onClick={toggleTheme}
          className={styles.mainContainer__themeBtn}
        >
          {isDarkMode ? (
            <Image src={IconSun} alt="sun" />
          ) : (
            <Image src={IconMoon} alt="moon" />
          )}
        </button>
      </section>
      <AddTodo addTask={addTask} />

      <div className={styles.mainContainer__bg}>
        <ListTasks
          tasks={filteredTasks}
          setTasks={setTasks}
          markAsCompleted={markAsCompleted}
          deleteTask={deleteTask}
        />
        {tasks.length > 0 && (
          <Footer
            itemsLeft={itemsLeft}
            handleFilter={handleFilter}
            deleteCompleted={deleteCompleted}
            filter={filter}
          />
        )}
      </div>
      {tasks.length > 0 && (
        <div className={styles.mainContainer__responsiveButtons}>
          <button
            className={`${styles.mainContainer__btn} ${
              filter === "ALL" ? styles.mainContainer__btnActive : ""
            }`}
            onClick={() => handleFilter("ALL")}
          >
            All
          </button>
          <button
            className={`${styles.mainContainer__btn} ${
              filter === "ACTIVE" ? styles.mainContainer__btnActive : ""
            }`}
            onClick={() => handleFilter("ACTIVE")}
          >
            Active
          </button>
          <button
            className={`${styles.mainContainer__btn} ${
              filter === "COMPLETED" ? styles.mainContainer__btnActive : ""
            }`}
            onClick={() => handleFilter("COMPLETED")}
          >
            Completed
          </button>
        </div>
      )}
    </main>
  );
}
