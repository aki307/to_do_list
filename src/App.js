import React, { Component } from 'react'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      submitNumber: 0,
    }
    this.doChange = this.doChange.bind(this)
    this.doSubmit = this.doSubmit.bind(this)
  }

  doChange(event) {
    this.input = event.target.value;
  }

  doSubmit(event) {
    const newTask = ({
      id: this.state.submitNumber,
      taskName: this.input,
      taskStatus: 'working',
    });
    this.setState({
      tasks: [...this.state.tasks, newTask]
    })
    // 暫定の表示
    ++this.state.submitNumber
    event.preventDefault()
  }



  render() {
    let tasks = [];
    let filteredTasks = this.state.tasks.filter(task => task.taskStatus === "working");

    let list = filteredTasks.map((value, key) => (
      <tr className={`task-${key}`}>
        <td className={`task-id-${key}`}> {value.id + 1} </td>
        <td className={`task-name-${key}`}> {value.taskName} </td>
        <td className={`task-status-${key}`}> <button className={`task-status-button-${key} btn ${value.taskStatus === 'working' ? 'btn-warning' : 'btn-success'}`}>{value.taskStatus}</button> </td>
        <td className={`task-delete-${key}`}> <button className={`task-delete-button-${key} btn btn-danger`}>削除</button> </td>
      </tr>
    ));
    return <div>
      <h1 className="bg-primary text-white display-4">React課題①-1</h1>

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
          <form onSubmit={this.doSubmit}>
            <div className="form-group">
              <label>新規タスクの追加</label>
              <input type="text" className="form-control"
                onChange={this.doChange} />
            </div>
            <input type="submit" className="btn btn-primary"
              value="追加" />
          </form>
        </div>
      </div>
    </div>
  }
}

export default App
