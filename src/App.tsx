import clsx from "clsx";
import styles from "./App.module.scss";
import Task from "./components/Task/Task";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

type TaskType = "all" | "completed" | "active";

const value = 6;

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedType, setSelectedType] = useState<TaskType>("all");
  const [tasks, setTasks] = useState([]);

  const addTask = (event: FormEvent) => {
    event.preventDefault();
    console.log(event);
  }

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as TaskType;
    setSelectedType(value);
  };

  useEffect(() => {
    inputRef.current?.focus();
    console.log('selectedType', selectedType);
  }, [selectedType]);

  console.log("Рендер App, selectedType:", selectedType);

  // Todo установить фокус на инпут при запуске и добавлнии задачи

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>To Do List</h1>
          <form action={addTask} className={styles.form}>
            <input
              type="text"
              placeholder="Новая задача"
              className={styles.input}
              ref={inputRef}
            />
            <button type="submit" className={clsx("button", styles.buttonAdd)}>
              <img
                src={"/icons/arrow.svg"}
                alt="Добавить задачу"
                className={clsx("buttonIcon", styles.iconArrow)}
              />
            </button>
          </form>
        </header>
        <span className={styles.left}>{`Задачи: ${selectedType} шт.`}</span>
        <ul className={styles.taskList}>
          <Task
            id="s"
            text="очень очень очень очень очень очень длинный текст"
            isCompleted={false}
          />
          <Task id="s" text="Задача 2" isCompleted={true} />
          <Task id="s" text="Задача 3" isCompleted={false} />
        </ul>
        <footer className={styles.footer}>
          <fieldset className={styles.typeGroup}>
            <label>
              <input
                type="radio"
                name="type"
                value="all"
                className={clsx(styles.radio, styles.radioTypeAll)}
                checked={selectedType === "all"}
                onChange={handleTypeChange}
              />
              Все
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="active"
                className={clsx(styles.radio, styles.radioTypeActive)}
                checked={selectedType === "active"}
                onChange={handleTypeChange}
              />
              Активные
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="completed"
                className={clsx(styles.radio, styles.radioTypeCompleted)}
                checked={selectedType === "completed"}
                onChange={handleTypeChange}
              />
              Завершенные
            </label>
          </fieldset>
        </footer>
      </div>
    </section>
  );
}

export default App;
