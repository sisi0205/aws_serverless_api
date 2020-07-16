# Handling Form Inputs in React – A Simple Step-by-Step Guide
Ok, Let’s start by displaying a simple text input in the frontend. So go inside the src/App.js file and replace the code with this:

```javascript
import React from "react"
import "./App.css"

function App() {
  return (
    <div>
      <h1>React Form Handling</h1>
      <form>
        <label>
          First Name: <input type="text" />
        </label>
      </form>
    </div>
  )
}

export default App
```

## Uncontrolled and Controlled Input
### uncontrolled Input 
At the moment, just like pure HTML form, this input element maintains its internal state. That is why we can write something in it by default. In this case, we call this type of input an **uncontrolled input**.
### controlled Input 
In React, it is the responsibility of the component rendering the form to control the input state. This way, the input would no longer listen to its internal state but the state declared in its component. By so doing, we are making the component state a single source of truth.

When you have this type of input, then you have a **controlled input**.
#### How does it work?
Depending on your component type, you will store your input data in the component state. Here, we will be using [the React Hook](https://ibaslogic.com/blog/react-hooks-tutorial/) to manage our form data. However, the approach is the same if you are using a class-based component. All you have to do is to declare a state object where your data would live.

From there, you will set up logic to listen to changes in the input and control it (i.e update the state) using the onChange event.
This way, you will always get up-to-date value as you will see in a moment.
The first step is to have the state manage the user’s input. So go ahead and update the src/App.js file to include the state.
```javascript
import React, { useState } from "react"
import "./App.css"

function App() {
  const [fname, setFname] = useState("")

  return (
    <div>
      <h1>React Form Handling</h1>
      <form>
        <label>
          First Name: <input type="text" value={fname} />
        </label>
      </form>
      <h5>First name: {fname}</h5>
    </div>
  )
}

export default App
```

### add a state
In the code, we added a state using the `useState` Hook and assigned a default empty string to the state variable, `fname`. This is similar to declaring a state object in a class-based component.

The second item return by the `useState` Hook (I called it `setFname`, but you can name it anything you like) is a function that will allow us to update the state value.

Now, for us to make the input field a controlled input, we assigned the state variable (which contains a default empty string) to the `value` prop.

Now, if you try to write anything in the text input field, nothing will happen. This is because the value prop is assigned a state variable whose value is set to empty string. And this is being forced on the input.

### update with `onChange` event handler
Update the code to include an onChange event handler.






