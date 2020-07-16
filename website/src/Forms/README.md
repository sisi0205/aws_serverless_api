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
```javascript
import React, { useState } from "react"
import "./App.css"

function App() {
  const [fname, setFname] = useState("")

  const handleChange = e => {
    setFname(e.target.value)
  }

  return (
    <div>
      <h1>React Form Handling</h1>
      <form>
        <label>
          First Name:{" "}
          <input type="text" value={fname} onChange={handleChange} />
        </label>
      </form>
      <h5>First name: {fname}</h5>
    </div>
  )
}

export default App
```
#### What is happening?
React needs an `onChange` handler to keep track of any changes in the field. Anytime you write something in the input field, this `onChange` event will trigger and then call its handleChange function that will re-render the state using `setFname` function.

In this function, we are updating the state variable, `fname` on every keystroke by passing to it the current value of the input field using `e.target.value`.

>Remember we can retrieve the value of whatever input from the predefined parameter,` e`. It’s an object that holds information about the input action or event.

At this point, we have a controlled input field where its state is being managed by its component. This is the simplest React form example.

## Adding Multiple Input Fields
In reality, you’ll be working with multiple input fields in your React application. In this scenario, we will make a simple adjustment not only to the handler function but also to the `input` element.

Let’s see this in action by adding another input field that collects the user’s last name.

We could decide to set up another `useState` Hook for the last name input. Then go ahead and assign its state variable to the `value` prop. But this approach will require us to define another handler function to update the input state.

We don’t want that. We want to manage all the state with a single handler function.

So, instead of passing a simple string in the `useState` Hook as we have it at the moment, we will be passing an object containing all the related state data.

In the src/App.js file, let’s update the React form component so you have:
```javascript
import React, { useState } from "react"
import "./App.css"

function App() {
  const [state, setState] = useState({
    fname: "",
    lname: "",
  })

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div>
      <h1>React Form Handling</h1>
      <form>
        <label>
          First Name:{" "}
          <input
            type="text"
            name="fname"
            value={state.fname}
            onChange={handleChange}
          />
        </label>{" "}
        <label>
          Last Name:{" "}
          <input
            type="text"
            name="lname"
            value={state.lname}
            onChange={handleChange}
          />
        </label>
      </form>
      <h5>
        Name: {state.fname} {state.lname}
      </h5>
    </div>
  )
}

export default App
```

#### What is happening?
First, you will notice a significant change in the code. We started by modifying the `useState` Hook to include an additional input data. From there, we have access to the first and last name through state.`fname` and state.`lname` as used in the value prop of their respective input element.

In these `input` elements, we’ve added a `name` prop that holds also their respective state name (i.e `fname` and `lname`). This is very important.

Now, let’s focus on the `handleChange` function. Here, we are using the `setState` function to update the inputs state.

```javascript
const handleChange = e => {
  setState({
    ...state,
    [e.target.name]: e.target.value,
  })
}
```

In this function, we are simply assigning to the element that is being targeted (through `[e.target.name]`) their corresponding values.

For instance, if the field for the first name changes, the `fname` assigned to the `name` prop replaces `[e.target.name]` like so:
```javascript
setState({
  fname: e.target.value,
})
```

Anytime we group related data as we have it in the state variable, the state returned by the `useState` Hook is not merged with that of the update passed to it. In other words, the `useState` Hook doesn’t merge the old and new state. Instead, it overrides the entire state with that of the current

For the meantime, comment-out the `…state` from the function so you have:
```javascript
const handleChange = e => {
  setState({
    // ...state,
    [e.target.name]: e.target.value,
  })
}
```

Save your file once again and try to write something in both input fields. You’ll see that they are overriding each other.

So to avoid this scenario, we merge them by spreading the entire state object using the three dots before the state and overriding the part of it.

## Adding the TextArea field
Unlike regular HTML where we define the text in between the `textarea` element. In React, the `textarea` is defined as a self-closing element just like the `input` element.

React is trying to maintain consistency with these inputs. This is good because we can as well use the `value` prop to get its up-to-date state value.

As expected, we will have the state manage the user’s input (i.e textarea message). So, update the state to include a `message` property like so:

```javascript
const [state, setState] = useState({
  fname: "",
  lname: "",
  message: "",
})
```
Next, add a `textarea` element in the return statement like so:
```javascript
return (
  ...
    <form>
      ...
      <br />
      <label>
        Your Message:{" "}
        <textarea
          name="message"
          value={state.message}
          onChange={handleChange}
        />
      </label>
    </form>
    <h5>
      Name: {state.fname} {state.lname}
    </h5>
    <p>Message: {state.message}</p>
  </div>
);
```

## The Select Input Field

This is not different from the other input fields. As usual, we can make it a controlled input by first have the state manage the input data. Then add a `value` prop to the element and finally update it through the `onChange` handler function (but in our case, we don’t have to do anything here because we have the logic set already).

So let’s create a dropdown list with options to select car brands.

As expected, add a new property in the state. In my case, I will call it `carBrand`.

```javascript
const [state, setState] = useState({
  ...
  carBrand: "",
});
```
Then, add the select element just before the closing </form> tag:
```javascript
return (
  ...
    <form>
      ...
      <br /><br />
      <label>
        Pick your favorite car brand:
        <select
          name="carBrand"
          value={state.carBrand}
          onChange={handleChange}
        >
          <option value="mercedes">Mercedes</option>
          <option value="bmw">BMW</option>
          <option value="maserati">Maserati</option>
          <option value="infinity">Infinity</option>
          <option value="audi">Audi</option>
        </select>
      </label>
    </form>
    <h5>
      Name: {state.fname} {state.lname}
    </h5>
    <h5>My favorite car brand: {state.carBrand}</h5>
    <p>Message: {state.message}</p>
  </div>
);
```

We are still doing the same thing. The value `prop` on the select element makes it a `controlled` input. Through this prop, we have access to the selected option at every point. If you want to display a default item (for instance, infinity) from the select option, your state should include the item like so:

## The checkbox Input
Unlike the other input fields, the checkbox uses a `checked` prop (which is a `Boolean` attribute) instead of the value prop. The idea is that a checkbox is either checked or not.

Now, if you take a look at the `handleChange` function, we only make provision for the inputs that have `value` prop through `e.target.value`
```javascript
const [state, setState] = useState({
  ...
  isChecked: false,
});
```
Here, we assign a Boolean value of `false` so that the input field is unchecked by default.

Next, add input checkbox just before the closing </form> tag.
```javascript
return (
  ...
    <form>
      ...
      <br /><br />
      <label>
        <input
          type="checkbox"
          name="isChecked"
          checked={state.isChecked}
          onChange={handleChange}
        />
{" "}
        Is Checked?
      </label>
    </form>
    <h5>
      Name: {state.fname} {state.lname}
    </h5>
    <h5>My favorite car brand: {state.carBrand}</h5>
    <p>Message: {state.message}</p>
    <h5>Is it checked? : {state.isChecked ? "Yes" : "No"}</h5>
  </div>
);
```

Finally, update the handleChange function so you have:
```javascript
const handleChange = e => {
  const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
  setState({
    ...state,
    [e.target.name]: value,
  })
}
```

#### What just happened?












