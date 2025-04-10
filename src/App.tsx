import clsx from 'clsx'
import styles from './App.module.scss'
import Task from './components/Task/Task'

function App() {

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h1 className={styles.title}>To Do List</h1>
        <form action="" className={styles.form}>
          <input
            type="text"
            placeholder='Новая задача'
            className={styles.input}
          />
          <button type='submit' className={clsx('button', styles.buttonAdd)}>
            <img
              src={'/icons/arrow.svg'}
              alt='Добавить задачу'
              className={clsx('buttonIcon', styles.iconArrow)}
            />
          </button>
        </form>
        <ul className={styles.taskList}>
          <Task id='s' text='Задача 1' isCompleted={false}/>
          <Task id='s' text='Задача 2' isCompleted={false}/>
          <Task id='s' text='Задача 3' isCompleted={false}/>
        </ul>
      </div>
    </section>
  )
}

export default App
