import { TaskProps } from "./../components/Task/Task";
import { TASK_STATUSES, TaskStatus } from "./../types/task";
import useLocalStorage from "use-local-storage";

export const useTasks = () => {
  const [selectedStatus, setSelectedStatus] = useLocalStorage<TaskStatus>('selectedStatus', TASK_STATUSES.ALL);
  const [tasks, setTasks] = useLocalStorage<TaskProps[]>('tasks', []);

  const addTask = (text: string) => {
    const newTask = {
      id: Date.now().toString(),
      text,
      isCompleted: false,
      onDelete: () => deleteTask(newTask.id),
      onComplete: () => completeTask(newTask.id),
    };
    setTasks([newTask, ...tasks])
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const completeTask = (id: string) => {
    setTasks(prevTasks => prevTasks?.map(
      task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ))
  }

  const clearCompleted = () => {
    setTasks(prevTasks => prevTasks?.filter(task => !task.isCompleted));
  }

  return {
    tasks,
    selectedStatus,
    setSelectedStatus,
    addTask,
    deleteTask,
    completeTask,
    clearCompleted
  };
}