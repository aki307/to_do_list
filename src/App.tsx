import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './App.css'

interface Task {
  id: number;
  taskName: string;
  taskStatus: 'working' | 'completed' | 'deleted';
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [submitNumber, setSubmitNumber] = useState<number>(0);
  const [input, setInput] = useState<string>('');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
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

  const doDelete = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  useEffect(() => {
    const updatedFilteredTasks = tasks.filter(task => task.taskStatus === "working");
    setFilteredTasks(updatedFilteredTasks);

    const updatedList = updatedFilteredTasks.map((value, key) => (
      <tr key={key} className={`task-${key}`}>
        <td className={`task-id-${key}`}>{key + 1}</td>
        <td className={`task-name-${key}`}>{value.taskName}</td>
        <td className={`task-status-${key}`}>
          <button className={`task-status-button-${key} btn ${value.taskStatus === 'working' ? 'btn-warning' : 'btn-success'}`}>
            {value.taskStatus}
          </button>
        </td>
        <td className={`task-delete-${key}`}>
          <button className={`task-delete-button-${key} btn btn-danger`} onClick={() => doDelete(value.id)} >
            削除
          </button>
        </td>
      </tr>
    ));
    setList(updatedList);
  }, [tasks]);

  return (<div>
    <h1 className="bg-primary text-white display-4">React課題①-2</h1>
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
