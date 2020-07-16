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
      <p>Message: {state.message}</p>
    </div>
  )
}

export default App