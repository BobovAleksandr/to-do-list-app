import styles from './Taks.module.scss';
import clsx from 'clsx';

interface TaskProps {
  id: string,
  text: string,
  isCompleted: boolean,
}

const Task = ({ id, text, isCompleted }: TaskProps) => {
  return (
    <li id={id} className={clsx(styles.task, isCompleted && styles.completed)}>
      <p className={styles.text}>
        {text}
      </p>
      <div className={styles.buttonGroup}>
        <button className={clsx('button', styles.buttonDelete)}>
          <img
            src={'/icons/cross.svg'}
            alt="Удалить задачу"
            className={clsx('buttonIcon', styles.iconArrow)}
          />
        </button>
        <button className={clsx('button', styles.buttonCheck)}>
          <img
            src={'/icons/check.svg'}
            alt={isCompleted ? 'Снять отметку выполнения' : "Отметить как выполненную"}
            className={clsx('buttonIcon', styles.iconArrow)}
          />
        </button>
      </div>
    </li>
  );
};

export default Task;