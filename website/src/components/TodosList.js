import React from "react"
import TodoItem from "./TodoItem";

class TodosList extends React.Component {
  render() {
    return (
      <div>
//        <TodosList todos={this.state.todos} />
        {this.props.todos.map(todo => (
//          <li>{todo.title}</li>
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    )
  }
}
export default TodosList