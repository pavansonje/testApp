import React, { Component } from "react";
import { QUESTIONS } from "../questions";

class Questions extends Component {
  render() {
    return (
      <>
        {Object.entries(QUESTIONS).map(([key, item]) => (
          <article key={key} className="grid-container">
            <div className="grid-item">{item}</div>
            <div className="grid-item">
              <label>
                <input type="radio" value="yes" name={key} required />
                Yes
              </label>
              <label>
                <input type="radio" value="no" name={key} required />
                No
              </label>
            </div>
          </article>
        ))}
        <div>
          <button>Submit</button>
        </div>
      </>
    );
  }
}

export default Questions;
