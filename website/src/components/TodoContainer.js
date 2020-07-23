import React from "react"
import TodosList from "./TodosList";
import Header from "./Header"
import InputTodo from "./InputTodo"
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import './App.css';


class TodoContainer extends React.Component {
  state = {
  todos: [
  ]
 };

  handleChange = id => {
  this.setState({
    todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    })
  });
  };
  delTodo = id => {
  this.setState({
    todos: [
      ...this.state.todos.filter(todo => {
        return todo.id !== id;
      })
    ]
  });
  };

  addTodoItem = title => {
   axios
    .post("https://g4kmiqqxm5.execute-api.us-east-2.amazonaws.com/dev", {
      Key: title,
      completed: false,
      title: title,
      id: uuidv4()
    })
    .then(response =>
      this.setState({
        todos: [...this.state.todos, response.data],
      })
    )
    .catch(
     (error) => {
      console.log('error ' + error);
     }
    )


  };

  componentDidMount() {
  axios.get("https://g4kmiqqxm5.execute-api.us-east-2.amazonaws.com/Stage/table?_limit=10",
  {
      params: {
        _limit: 10
      }
    }

  ).then(response => {
   console.log(response.data);
   this.setState({ todos: response.data.map(
           item => {
             item['id'] = uuidv4();
             item['completed'] = false;
             item['title'] = item['Key']
             return item;
           }
        )
     }
   );
   })
  }


  render() {
     return (
     <div className="App">
     <Header />
     <InputTodo addTodoProps={this.addTodoItem} />
     <TodosList todos={this.state.todos}
     handleChangeProps={this.handleChange}
     deleteTodoProps={this.delTodo}
      />
     <a
          className="App-link"
          href="https://g4kmiqqxm5.execute-api.us-east-2.amazonaws.com/dev"
          target="_blank"
          rel=""
        >
         copy file to s3 bucket
      </a>
      <p>

      </p>

      <a
          className="App-link"
          href="https://g4kmiqqxm5.execute-api.us-east-2.amazonaws.com/dev/table"
          target="_blank"
          rel=""
       >
          Table
       </a>
     </div>
    )
  }
}
export default TodoContainer