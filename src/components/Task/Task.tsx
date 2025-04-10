import styles from './Taks.module.scss'

interface TaskProps {
  id: string,
  text: string,
  isCompleted: boolean,
}

const Task = ({ id, text, isCompleted }: TaskProps) => {
  return (
    <li className={styles.task}>
      {text}
    </li>
  );
};

export default Task;