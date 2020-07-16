
# The concept of Virtual DOM
As a JavaScript developer, you are sure to have interacted with the real DOM while building interactive websites. Though, you may have been able to avoid understanding how it works.

So, let’s reiterate to enable you to quickly grasp the concept behind virtual DOM that React provides for us.

The DOM (Document Object Model) is an interface that allows JavaScript or other scripts to read and manipulate the content of a document (in this case, an HTML document). Whenever an HTML document is loaded in the browser as a web page, a corresponding Document Object Model is created for that page. This is simply an object-based representation of the HTML.

This way, JavaScript can connect and dynamically manipulate the DOM because it can read and understand its object-based format. This makes it possible to add, modify contents or perform actions on web pages.

But hey! There is a problem. Though not with the DOM.

Every time the DOM changes, the browser would need to recalculate the CSS, run layout and repaint the web page.

And with Single Page Application (SPA) whereby JavaScript updates the DOM much more than they have to. Things become slower due to the process in the browser workflow after DOM manipulation.

So we need a way to minimize the time it takes to repaint the screen.

This is where the Virtual DOM comes in.

As the name implies, it is a virtual representation of the actual DOM. It uses a strategy that updates the DOM without having to redraw all the webpage elements. This ensures that the actual DOM receive only the necessary data to repaint the UI.

This is how it works,

Whenever a new element is added to the UI, a virtual DOM is created.

Now, if the state of this element changes, React would recreate the virtual DOM for the second time and compare with the previous version to detect which of the virtual DOM object has changed.

It then updates ONLY the object on the real DOM.

This has a whole lot of optimization as it reduces the performance cost of re-rendering the webpage.

DO not worry if all these seem strange, you will get to see them in practice later.

Setting up Working Environment
There are several ways we can interact and get started with React. Though React recommended setting up the environment through the create-react-app CLI tool (coming to that), I will quickly walk you through how to start working with React by simply writing React code in HTML file.

This will quickly get you up and running and does not require any installation.

So let’s do it.

# What is JSX?
Writing JavaScript/React code to describe what the user interface (UI) will look like is not as simple as you may think.

This makes the React author create what looks like a JavaScript version of HTML. This is called JSX (JavaScript XML). It is an XML like syntax extension to JavaScript that makes it easier and more intuitive to describe the UI.

Under the hood, the JSX is being translated to regular JavaScript version of itself at runtime since the browser can’t read it.

This is how it works:

The JSX code is passed to Babel (a JavaScript compiler) which will then convert it to plain JavaScript code that all browser can understand. This compiler also changes any JavaScript ES6 features into what the older browsers would recognize. For instance, it converts the const keyword to var.
# Writing React directly in HTML

# Writing the To-dos App
## Creating the Component files

Start by creating a folder called components inside the src directory and create these components files – i.e TodoContainer.js, Header.js, InputTodo.js, TodosList.js and TodoItem.js.

Next, add the following code in the parent component file, TodoContainer.js and save it:
```javascript
import React from "react"
class TodoContainer extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello from Create React App</h1>
        <p>I am in a React Component!</p>
      </div>
    )
  }
}
export default TodoContainer
```
Also, go inside the index.js file and update it so it looks like so:

```javascript
import React from "react"
import ReactDOM from "react-dom"
//component file
import TodoContainer from "./components/TodoContainer"
ReactDOM.render(<TodoContainer />, document.getElementById("root"))
```
## Working with Data

### Starting with the props

The props (which stands for properties) can be thought of as the attributes in HTML element.

For instance, the attributes – type, checked – in the input tag below are props.

```html
<input type="checkbox" checked="{true}" />
```
They are the primary way to send data and/or event handlers down the component tree. i.e from parent to its child component.

When this happens, the data that is received in the child component becomes read-only and cannot be changed by the child component. This is because the data is owned by the parent component and can only be changed by the same parent component.

### state
If props allow a child component to receive data from its parent, what happens if a user inputs data directly to the component?

That is why we have the state.

Think of the state as the data you can store to a specific component. This data is owned and can only be updated by the component holding it. Making the state local to that component.

So anytime you want some data to be updated whenever user perform some action like updating input field, toggling menu button etc., then you will make use of the state.

#### Adding state
As we have it in the app diagram, the InputTodo component will carry the responsibility of accepting the user’s input. That means we will need a place to store the data (in this case, the store is the state) received through the input. From there, we can display the data in the frontend.

Likewise, the TodosList component will be accessing the state data and display its todos items. Also, the TodoItem component (which holds the checkbox and delete button) will be accessing the data to update the checkbox and also remove items from the state.

Now, for every component that will be accessing the state data, you will need to declare the state object in the file of their closest common parent.
Though, instead of declaring the state object in the parent component as mentioned above, an alternative is to use the Context API to[ manage the state data](https://ibaslogic.com/blog/react-context-api/). As a beginner, you should explore all options.
For this reason, the state data will live in the TodoContainer component, which is their closest common parent.
To add a state in a class component, we simply create a state object with different key-value pair. The value can be of any data type.

In the case of the todos data, we will have an array of objects.

So add the following code just above the render() method in the TodoContainer.js file:

```javascript
state = {
 todos: [
///object
   {
     id: 1,
     title: "Setup development environment",
     completed: true
   },
   {
     id: 2,
     title: "Develop website and add content",
     completed: false
   },
   {
     id: 3,
     title: "Deploy to live server",
     completed: false
   }
 ]
};
```

Still in the file, update the render() method so it looks like this:
```javascript
render() {
 return (
   <div>
     {this.state.todos.map(todo => (
       <li>{todo.title}</li>
     ))}
   </div>
 );
}
```
#### pass data to List 
What we want to do is to pass the state data from the TodoContainer to the TodosList component. Recall that we can pass data down the tree through props. And I mentioned that the prop is just like the HTML attribute.
create a `TodosList.js`
```javascript
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
```
At this point, you now have the state data in the todos prop. Thanks to this line:
```javascript
<TodosList todos={this.state.todos} />
```
#### access the data from props
```javascript
class TodosList extends React.Component {
  render() {
    return (
      <div>
//        <TodosList todos={this.state.todos} />
        {this.props.todos.map(todo => (
          <li>{todo.title}</li>
        ))}
      </div>
    )
  }
}
export default TodosList
```
Notice how we accessed the state data from within the child component, TodosList, using this.props.todos.

Always remember, with props, we can access state data at different levels of the component hierarchy. This is called prop drilling.
It has to do with manually getting data from component A down to component B through the props. Where component A is the parent of B.

As a recap,

*The todos data that come from the state of the TodoContainer component is passed as props using todos={this.state.todos}. Then, we accessed it through this.props.todos from within the TodosList component.*
#### fix console warning 
Whenever you map through something, a list is created. React want each child in the list to have a unique key prop. This helps React to identify which items have changed, added or removed.

To add this unique key prop, we will take advantage of the id we provided in the TodoContainer state. We can access these id the same way we accessed the title.
```javascript
<li key={todo.id}>{todo.title}</li>
```

#### Add a to do item 

update TodoList.js

```javascript 
import React from "react"
import TodoItem from "./TodoItem";

class TodosList extends React.Component {
  render() {
    return (
      <div>
        {this.props.todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    )
  }
}
export default TodosList
```

update TotoItem.js
```javascript
import React from "react"

class TodoItem extends React.Component{

  render() {

    return <li>{this.props.todo.title}</li>
  }
}
export default TodoItem
```

### Creating the Function Component