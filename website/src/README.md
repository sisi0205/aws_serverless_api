# [React Tutorial: Getting Started with React Form and Handling Event](https://ibaslogic.com/blog/react-form-handling/)

[github](https://github.com/Ibaslogic/simple-todo-app)
In the [first part of the React tutorial](https://ibaslogic.com/blog/react-tutorial-for-beginners/) for beginners, we covered some of the basics of React; set up React working environment and started writing our Todos application.
Now, in this part, we will take a look at integrating form in our React app, you will also get to know how to raise and handle events in React
But before you go ahead, I will advise you to take a look at how to handle [form inputs](https://ibaslogic.com/blog/simple-guide-to-react-form/) fields in React. There, you will learn how the common input types such as checkbox, text, textarea, select input, radio and range work in React.

## Adding checkboxes to the Todo items

### uncontrolled 
Open the src/components/TodoItem.js file. Add the checkbox input just before the {this.props.todo.title} in the li element.
```
<input type="checkbox" />
```

By default, the input type (i.e checkboxes) are being handled by the DOM – i.e they have the default HTML behaviour. That is why you can toggle the boxes.

This type of input is called `uncontrolled` input. This is not the case with React, the input fields are meant to be `controlled`.

This takes us to another important subtopic.

### Controlled Component
To make the input field controllable, the input data (in this case, toggling of the checkbox) has to be handled by the component state and not the browser DOM.

With this, the state will serve as a **single source of truth**. Meaning, the input checkbox would no longer listens to its internal state (i.e the browser DOM) but the state in your app. This is necessary because the component state will not change unless you change it.

If you take a look at the `state` object in the parent component, we have a Boolean value (`true` or `false`) assigned to every completed key in the `todos` data.

So go inside the `TodoItem.js` file and add a `checked prop` to the `input` checkbox and then assign {`this.props.todo.completed`}.

```javascript
<input type="checkbox" checked={this.props.todo.completed} />
```

Remember, just like the `title`, we have access to the `completed` value in this component.

At this point, you have succeeded in making the input checkbox a `controlled` input because it now listens only to the state in your application.

Now if you try to toggle any of the checkboxes, nothing will happen. This is because each of the checked attributes is assigned a `value` equal to the current value of the state.

Remember, only the first task is assigned to be completed.

We need a way to change the state whenever users click on the checkboxes. React already gives us a hint through the Console tab of the browser DevTools.

If you open it, you'll see a warning displayed as a result of the added `checked` attribute.

React is telling us to add an `onChange` handler to keep track of any changes in the field. Else, it wouldn’t know if the input field is checked or not.

So let’s update the input tag in the `TodoItem.js` file to include the handler.

```java
<input
  type="checkbox"
  checked={this.props.todo.completed}
  onChange={() => console.log("clicked")}
/>
```

For the meantime, we are assigning to the handler, a callback function that will log a "clicked" text in the console whenever the checkbox is clicked.

Now, instead of logging text in the console, we want to toggle the checkboxes anytime they are being clicked.

To do this, we need to understand how to raise and handle events

### Raising and Handling Events
In our app, the parent component, `TodoContainer` is the one that holds the state data. This component, therefore, is the ONLY one that can change it.

Meaning the `TodoItem` component, which is the one handling the checkboxes, cannot change the state data in the parent component, `TodoContainer`.

We need to find a way to access the state data from the `TodoItem` and toggle the `completed` value to `true` or `false` in the `TodoContainer` component.

To do this, we will need to raise an event from the `TodoItem up` a level to `TodosList`, and then into `TodoContainer` component.

In other words, we need to climb a ladder.
![image](https://ibaslogic.com/static/34ea7bfae797ee1444622abbbfc8e72f/58042/handling-event.png)
The `TodoItem` component will raise the event while the parent component, `TodoContainer` will handle the event.

And the way we do that is through `props`.

This is kind of tricky but trust me it's very simple. You can either go from the child to parent component or the other way round. I prefer the latter.

So let’s do it.

We will first enable communication between these components.

Starting from the parent component, `TodoContainer`, add a handler method, `handleChange` just above the `render()` method.

```javascript
handleChange = () => {
  console.log("clicked");
};
```

You can name this method anything you like. Let’s see how we can communicate with this method from the child component.

Start by passing this method to the `TodosList` component through the props.

So update `<TodosList />` so you have:
```java
<TodosList todos={this.state.todos} handleChangeProps={this.handleChange} />
```
>Note: We are using this.handleChange to reference the handleChange() method because it is part of the class.

Now, you have the `handleChange()` method assigned to the `handleChangeProps`. Its data can be accessed through props in the `TodosList` component.

From there, we can pass it to the `TodoItem` component.

Let’s update the `<TodoItem />` instance in the `TodosList.js` file so you have:

```javascipt
<TodoItem
  key={todo.id}
  todo={todo}
  handleChangeProps={this.props.handleChangeProps}
/>
```

At this point, the `handleChange()` data can be accessed from the `TodoItem` component.

So update the `onChange` handler in the `TodoItem` component so you have:
```javascript
onChange={() => this.props.handleChangeProps()}
```
This time, make sure you have parenthesis,**()** attached to the `handleChangeProps`.

Now, if you click any of the checkboxes, the `onChange` event will trigger and will call the `handleChange()` method in the parent component, `TodoContainer`.

For now, we are only logging a text in the console.

Let’s go a step further.

We need to identify which one of the checkboxes is clicked. To do this, we need to pass along their respective `ids` through the callback function.

Update the `onChange` handler in the `TodoItem` component to include the `id`.
```javascript
onChange={() => this.props.handleChangeProps(this.props.todo.id)}
```
Remember, just like the `title` and the `completed` value, we also have access to the `id` in this component.
Then go inside the `TodoContainer` component and update the `handleChange` method.

```javascript
handleChange = (id) => {
  console.log("clicked", id);
};
```

### Updating the state using the setState() method
Our aim here is to change the state of the checkbox whenever it is clicked. In React, we do not modify the state directly. Instead, we update through a method we inherited by extending `React.Component`.

This method is called `setState()`. It tells React that we are updating the state.

React figures out what part of the state is changed and then update ONLY that part in the real DOM.

All we need to do in the `handeChange` method is to check if the `id` of the clicked checkbox matches any of the todos items id. If it does, we will flip the `completed` value from true to `false` and `vice versa`.

Now, go inside the `TodoContainer` component and update the `handeChange` method so it looks like this:
```javascript
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
```

The `id` on the first line comes from the `TodoItem` component (it contains the checked id). You know that already!

On looping through the todos data, we check if any of the items id matches the checked id. Then, we flip the completed value.

Save the file and check your application. You should be able to toggle the checkboxes.

### Deleting items from the todos
This will be similar to how we handled the input checkboxes. Here also, the todos items live in the `TodoContainer`, while the delete `button` will live in the `TodoItem` component.

That means we will be raising an event from the `TodoItem` component and move up levels until we get to the `TodoContainer` component where the event will be handled.

Let’s get down.

Start by adding a delete button in the `TodoItem` component.

So add this `button` element below the `input` tag:
```javascript
<button>Delete</button>
```
We will update it later.

As usual, we will enable communication between these components to raise an event.

So go inside the `TodoContainer` component and add a `delTodo` method above the `render()`.
```javascript
delTodo = id => {
  console.log("deleted", id);
};
```
Still in the component, update the `<TodosList />` to include:
```
deleteTodoProps={this.delTodo}
```
```javascript
<TodosList
  todos={this.state.todos}
  handleChangeProps={this.handleChange}
  deleteTodoProps={this.delTodo}
/>
```

Save the file and move a level down inside the `TodosList` component and update the `<TodoItem />` so you have:
```javascript
<TodoItem
  key={todo.id}
  todo={todo}
  handleChangeProps={this.props.handleChangeProps}
  deleteTodoProps={this.props.deleteTodoProps}
/>
```
Finally, back in the `TodoItem` component. Update the `button` element to include an `onClick` event handler that will trigger the `delTodo` method in the parent component.

You should have this:
```javascript
<button onClick={() => this.props.deleteTodoProps(this.props.todo.id)}>
  Delete
</button>
```
At the moment, we are logging "deleted" text alongside the id of the deleted items.

Up to this point, we are repeating what we did for the checkbox. If it's not clear, revisit the earlier explanation.

Next, we will manipulate the state and remove any of the deleted items from the list. The way we do that is by using the `filter()` method.

This method is also a higher-order function just like the `map()` method. It returns a new array by applying a condition on every array element.

In this case, we only want to return the todos items that do not match the id that will be passed in – i.e the clicked id. Any id that matches will be deleted.

Now update the `delTodo` method so you have:
```javascript
delTodo = id => {
  this.setState({
    todos: [
      ...this.state.todos.filter(todo => {
        return todo.id !== id;
      })
    ]
  });
};
```
With the `filter()` method, we are saying that for each of the todos data that we are looping through, we want to retain the once whose id is not equal to the id passed in.
>Please note the spread operator (…) in the code. It allows us to grab the current todos item(s) at every point. As this is necessary for the code to work.

### Adding a text input field and a submit button
In React, all the different types of input fields follow the same approach. We’ve seen how the checkbox type of input field works. Using the same pattern, we will add the text input field that will allow users to add todos items to the list.

Let’s start by adding the following code inside the empty `InputTodo.js` file:
```javascript
import React, { Component } from "react"

class InputTodo extends Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Add Todo..." />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
export default InputTodo
```

Since we will be getting data through the user’s interaction (i.e through the input field), this component will, therefore, hold state. For that reason, it will be a class-based component.
Also, notice how we are extending the `Component` class in the React library.

Unlike the previous class components where we used `React.Component`. Here, we are using `Component` after importing it from the `react` module like this:
To use this component in our application, we will import it inside the `TodoContainer.js` file using this code:
```javascript
import InputTodo from "./InputTodo"
```

Then, add `<InputTodo />` inside the `render()` method just below the `<Header />`.
```javascript
render() {
  return (
    <div>
      <Header />
      <InputTodo />
      <TodosList
        todos={this.state.todos}
        handleChangeProps={this.handleChange}
        deleteTodoProps={this.delTodo}
      />
    </div>
  );
}
```

As we did for the checkbox, we have to make the form input field a controlled field.

The first step is to have a state manage the user's input. So, add this code just above the `render()` method in the `InputTodo` component:








