# [Making HTTP Request in React and understanding the lifecycle methods](https://ibaslogic.com/blog/react-http-request-and-lifecycle-methods/)

### An HTTP request
is a packet of information that one computer (client) sends to another computer (server) to convey something. Once the message is received by the server, a response is expected by the client.

### The Native Fetch API
allows us to perform an HTTP request to a server and handle responses. Axios, on the other hand, is a 3rd party HTTP library that allows us to make this request as well.

In this tutorial, we will make use of *Axios* to fetch a list of todos data.

One of the benefits of using this library over the native Fetch API is that it supports all modern browsers, including support for IE8 and higher by default. This is because it is compiled with Babel.

For Fetch API to support older browsers, it needs what is called polyfill – a piece of code used to provide modern functionality on older browsers.

Finally, understanding the REST API is necessary if you want to get data from another source on the internet. In our case, we will be getting a piece of data (a list of todos) when we link to a specific URL endpoint.

First, you need to start your server by running npm start. After that, delete all the hardcoded todos data in the TodoContainer component.

The state object now looks like this:
```javascript
state = {
  todos: [],
}
```

So stop the server with CTRL + C and run this from your terminal:
```
npm i axios
```

## The Lifecycle methods

Every React component you create always goes through a series of events or phases from its birth to death. For instance, if you create a component to render something on the screen, it will go through a couple of phases to display the content.

You can think of this component going through a cycle of birth, growth and finally death.

In React, these phases are mainly three:

* **Mounting** – As the name implies, this is the phase when React component mounts (created and inserted) the DOM. In this phase, the component is birthed.

* **Updating** – Once the component is mounted, next is to get updated if necessary. Remember that component gets updated when there is/are state or prop changes, hence trigger re-rendering. All of that happens in this phase.

* **Unmounting**  – This phase ends the component lifecycle because, in it, the component is removed from the DOM.

In each of these phases, React provides lifecycle methods that we can use to monitor and manipulate what happens within the component.

Though, we have been using one of these lifecycle methods – the  `render()` method.

This method is the only required lifecycle method within a React class component. It’s responsible for rendering React elements in the DOM and it is called during the mounting and updating phase.

React has several optional lifecycle methods, of which some are deprecated. But the common once include –

**componentDidMount()** – This method is called after the component is rendered.

**componentDidUpdate()** – This is called immediately after updating occurs.

**componentWillUnmount()** – This is called just before a component is unmounted or destroyed.


### The componentDidMount() method
As a beginner, you will most likely be working with the `componentDidMount()` in addition to the `render()` lifecycle method. This is because, most of the time, you will be making an HTTP request. And one of the common uses of this lifecycle method is to get data from somewhere.

Remember, we want to load todos data from a remote endpoint. So, the `componentDidMount()` method is a good place to make this type of HTTP request. This ensures that your data is fetched as soon as possible.

So let's apply this method. Start your development server with npm start

## Making a GET request
As expected, we use the `Get` HTTP method to fetch data. So, let’s start by importing the Axios library in the `TodoContainer.js` file:
```javascript
import axios from "axios";
```
Then add the following code above the `render()` method in the `TodoContainer` component:
```javascript
componentDidMount() {
  axios.get("https://jsonplaceholder.typicode.com/todos")
    .then(response => console.log(response.data));
}
```
####  limit the number of todos

This can be done either by appending the query string parameter `\_limit=10` to the URL or by adding them as a second argument in the `get()` method.

I will show you both options.

* First, update the endpoint URL so you now have this:
```javascript
"https://e6tsicu0ga.execute-api.us-east-2.amazonaws.com/Prod/table?_limit=10"
```
* The second option is to add a config object as the second parameter in the get() method like so:
```javascript
componentDidMount() {
  axios.get("https://jsonplaceholder.typicode.com/todos", {
      params: {
        _limit: 10
      }
    })
    .then(response => console.log(response.data));
}
```
Here we are using the `params` option to set a query string parameter in the config object.

To be on the same page, let’s go with the first method.

Before we go ahead and display the todos items in our app, let’s explain what we did.

First, I guess you remember why we are using the `componentDidMount()` method. Again, it is a good place to make an HTTP request.

Here, we are using HTTP `GET` method to retrieve data from an endpoint.

By using Axios, we make use of `axios.get()` method. This accepts the URL of the endpoint and an optional config object as the second parameter.

This method, `axios.get()` returns a promise which must be resolved to access the data. To do that, we use the `.then()` method which will receive a response that contains the data we need.

Now, we can update the state with these data.

Update the code so you have:
```javascript
then(response => {
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
```

Thanks to the `setState()` call. React knows that the `todos` have changed from the empty data we assigned in the state to the data we received from the JSONPlaceholder API. It then calls the `render()` method once again to display the new data.

As you can see, some are marked as completed because they are assigned a true value. You can visit the endpoint URL in your browser and see what is assigned to each of the completed keys.

















