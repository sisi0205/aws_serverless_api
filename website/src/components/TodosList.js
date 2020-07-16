import React from "react"

class TodosList extends React.Component {
  render() {
    return (
      <div>
        <TodosList todos={this.state.todos} />
      </div>
    )
  }
}
export default TodosList