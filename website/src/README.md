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


