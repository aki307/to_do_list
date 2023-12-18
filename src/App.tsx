import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './App.css'

interface Task {
  id: number;
  taskName: string;
  taskStatus: 'working' | 'completed';
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const doChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const doSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!input.trim()) return;
    const newTask: Task = {
      id: tasks.length,
      taskName: input,
      taskStatus: 'working',
    };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const toggleTaskStatus = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, taskStatus: task.taskStatus === 'working' ? 'completed' : 'working' } : task
    ));
  };


  const doDelete = (taskId: number) => {
    const remainingTasks = tasks.filter(task => task.id !== taskId);
    const updatedTasks = remainingTasks.map((task, index) => ({ ...task, id: index }));
    setTasks(updatedTasks);
  };

  const convertTaskStatusToJapanese = (status: 'working' | 'completed') => {
    return status === 'working' ? '作業中' : '完了';
  };

  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(event.target.value);
  };

  const filteredTasks = tasks.filter(task => selectedStatus === 'all' || task.taskStatus === selectedStatus)
    .map((task, index) => (
      <tr key={task.id}>
        <td>{task.id}</td>
        <td>{task.taskName}</td>
        <td>
          <button className={`btn ${task.taskStatus === 'working' ? 'btn-warning' : 'btn-success'}`} onClick={() => toggleTaskStatus(task.id)}>
            {convertTaskStatusToJapanese(task.taskStatus)}
          </button>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => doDelete(task.id)}>
            削除
          </button>
        </td>
      </tr>
    ));

  return (<div>
    <h1 className="bg-primary text-white display-4">React課題①-4</h1>
    <div className="container">
      <h1>ToDoリスト</h1>
      <div id="radioContainer">
        <input type="radio" name="example" value="all" checked={selectedStatus === 'all'} onChange={handleStatusChange} />すべて
        <input type="radio" name="example" value="working" checked={selectedStatus === 'working'} onChange={handleStatusChange} />作業中
        <input type="radio" name="example" value="completed" checked={selectedStatus === 'completed'} onChange={handleStatusChange} />完了
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
            {filteredTasks}
          </tbody>
        </table>
      </div>

      <div className="alert alert-primary mt-3">
        <form onSubmit={doSubmit}>
          <div className="form-group">
            <label>新規タスクの追加</label>
            <input type="text" className="form-control"
              onChange={doChange} value={input} />
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
