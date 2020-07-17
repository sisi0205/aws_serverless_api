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



















