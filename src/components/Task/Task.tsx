import styles from './Task.module.scss';
import clsx from 'clsx';

export interface TaskProps {
  id: string,
  text: string,
  isCompleted: boolean,
  onDelete: (id: string) => void,
  onComplete: (id: string) => void
}

export const Task = ({ id, text, isCompleted, onDelete, onComplete }: TaskProps) => (
    <li id={id} className={clsx(styles.task, isCompleted && styles.completed)}>
      <p className={styles.text}>
        {text}
      </p>
      <div className={styles.buttonGroup}>
        <button className={clsx('button', styles.buttonDelete)} onClick={() => onDelete(id)}>
          <img
            src={'/icons/cross.svg'}
            alt="Удалить задачу"
            className={clsx('buttonIcon', styles.iconCross)}
          />
        </button>
        <button className={clsx('button', styles.buttonCheck)} onClick={() => onComplete(id)}>
          <img
            src={'/icons/check.svg'}
            alt={isCompleted ? 'Снять отметку выполнения' : "Отметить как выполненную"}
            className={clsx('buttonIcon', styles.iconCheck)}
          />
        </button>
      </div>
    </li>
);