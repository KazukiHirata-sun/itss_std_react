import React, { Component } from 'react';
import TodoList from './components/TodoList'

class App extends Component {
  render() {
    return (
      <div className="d-flex">
          <TodoList />
      </div>
    );
  }
}

export default App;