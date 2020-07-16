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
  )
}

export default App