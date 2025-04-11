import clsx from "clsx";
import styles from "./App.module.scss";
import { Task } from "./components/Task/Task";
import { FormEvent, useEffect, useMemo, useRef } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TASK_STATUSES, TaskStatus } from "./types/task";
import { useTasks } from './hooks/useTasks';

function App() {
  const {
    tasks,
    selectedStatus,
    setSelectedStatus,
    addTask,
    deleteTask,
    completeTask,
    clearCompleted } = useTasks();

  const inputRef = useRef<HTMLInputElement>(null);
  const [taskListRef] = useAutoAnimate<HTMLUListElement>();

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (selectedStatus === TASK_STATUSES.ALL) return true;
      if (selectedStatus === TASK_STATUSES.ACTIVE) return !task.isCompleted;
      return task.isCompleted;
    });
  }, [tasks, selectedStatus]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (inputRef.current) {
      const text = inputRef.current.value.trim();
      if (text) {
        addTask(text);
        inputRef.current.value = '';
        inputRef.current.focus();
      }
    }
  }

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as TaskStatus;
    setSelectedStatus(value);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>To Do List</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
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
        <main className={styles.main}>
          <ul className={styles.taskList} ref={taskListRef}>
            {filteredTasks.map(task => (
              <Task 
                key={task.id}
                id={task.id}
                isCompleted={task.isCompleted}
                text={task.text} onDelete={deleteTask}
                onComplete={completeTask}
              />
            ))}
          </ul>
        </main>
        <footer className={styles.footer}>
          <fieldset className={styles.statusGroup}>
            <label className={clsx(styles.radio, styles.radioStatusAll)}>
              <input
                type="radio"
                name="status"
                value={TASK_STATUSES.ALL}
                checked={selectedStatus === TASK_STATUSES.ALL}
                onChange={handleStatusChange}
              />
              Все
            </label>
            <label className={clsx(styles.radio, styles.radioStatusActive)}>
              <input
                type="radio"
                name="status"
                value={TASK_STATUSES.ACTIVE}
                checked={selectedStatus === TASK_STATUSES.ACTIVE}
                onChange={handleStatusChange}
              />
              Активные
            </label>
            <label className={clsx(styles.radio, styles.radioStatusCompleted, TASK_STATUSES.COMPLETED)}>
              <input
                type="radio"
                name="status"
                value={TASK_STATUSES.COMPLETED}
                checked={selectedStatus === TASK_STATUSES.COMPLETED}
                onChange={handleStatusChange}
              />
              Завершенные
            </label>
          </fieldset>
          <span className={styles.tasksLeft}>{`Активных задач: ${tasks.filter(task => !task.isCompleted).length}`}</span>
          <button className={styles.buttonClear} onClick={clearCompleted}>
            <img src={'/icons/trash.svg'} alt="" className={styles.clearIcon} />
            <p>Удалить завершенные</p>
          </button>
        </footer>
      </div>
    </section>
  );
}

export default App;

