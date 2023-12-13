import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './App.css'

interface Task {
  id: number;
  taskName: string;
  taskStatus: 'working' | 'completed';
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [submitNumber, setSubmitNumber] = useState<number>(0);
  const [input, setInput] = useState<string>('');
  const [list, setList] = useState<JSX.Element[]>([]);

  const doChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const doSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newTask: Task = {
      id: submitNumber,
      taskName: input,
      taskStatus: 'working',
    };
    setTasks([...tasks, newTask]);
    setSubmitNumber(prevNumber => prevNumber + 1);
  };

  const toggleTaskStatus = (taskId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          taskStatus: task.taskStatus === 'working' ? 'completed' : 'working'
        };
      }
      return task;
    }));
  };

  const doDelete = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const convertTaskStatusToJapanese = (status: 'working' | 'completed') => {
    return status === 'working' ? '作業中' : '完了';
  };

  useEffect(() => {
    const updatedList = tasks.map((task, index) => (
      <tr key={index} className={`task-${index}`}>
        <td className={`task-id-${index}`}>{task.id}</td>
        <td className={`task-name-${index}`}>{task.taskName}</td>
        <td className={`task-status-${index}`}>
          <button
            className={`task-status-button-${index} btn ${task.taskStatus === 'working' ? 'btn-warning' : 'btn-success'}`}
            onClick={() => toggleTaskStatus(task.id)}
          >
            {convertTaskStatusToJapanese(task.taskStatus)}
          </button>
        </td>
        <td className={`task-delete-${index}`}>
          <button
            className={`task-delete-button-${index} btn btn-danger`}
            onClick={() => doDelete(task.id)}
          >
            削除
          </button>
        </td>
      </tr>
    ));
    setList(updatedList);
  }, [tasks, toggleTaskStatus]);

  return (<div>
    <h1 className="bg-primary text-white display-4">React課題①-3</h1>
    <div className="container">
      <h1>ToDoリスト</h1>
      <div id="radioContainer">
        <input type="radio" name="example" value="all" checked id="all-tasks" />すべて
        <input type="radio" name="example" value="working" id="working-tasks" />作業中
        <input type="radio" name="example" value="completed" id="complete-tasks" />完了
      </div>
      <div id="taskLists">
        <table id="task-table">
          <thead>
            <tr id="task-item">
              <th>ID</th>
              <th>コメント</th>
              <th>状態</th>
            </tr>
          </thead>
          <tbody id='table-body'>
            {list}
          </tbody>

        </table>
      </div>

      <div className="alert alert-primary mt-3">
        <form onSubmit={doSubmit}>
          <div className="form-group">
            <label>新規タスクの追加</label>
            <input type="text" className="form-control"
              onChange={doChange} />
          </div>
          <input type="submit" className="btn btn-primary"
            value="追加" />
        </form>
      </div>
    </div>
  </div>
  );
}

export default App;