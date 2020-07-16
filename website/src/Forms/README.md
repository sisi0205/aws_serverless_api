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
