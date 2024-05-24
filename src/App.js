import React, { Component } from "react";
import { QUESTIONS } from "./questions";

class App extends Component {
  constructor(props) {
    super(props);
    this.calculateAverage(this.fetchData());
  }
  state = {
    score: 0,
    isScoreVisible: false,
    isAvgVisible: false,
    average: 0,
  };

  fetchData() {
    const savedAnswers = localStorage.getItem("answers");

    var savedAns = savedAnswers !== null ? JSON.parse(savedAnswers) : [];

    return savedAns;
  }

  calculateAverage(data) {
    const results = data.map(
      (item) =>
        (100 *
          Object.entries(item).filter((item) => item[1] === "yes").length) /
        Object.entries(item).length
    );
    const avg = results.reduce((acc, curr) => acc + curr, 0) / results.length;
    this.state = { average: avg || 0, isAvgVisible: avg && true };
  }
  updateAverage(data) {
    const results = data.map(
      (item) =>
        (100 *
          Object.entries(item).filter((item) => item[1] === "yes").length) /
        Object.entries(item).length
    );
    const avg = results.reduce((acc, curr) => acc + curr, 0) / results.length;
    this.setState({ average: avg, isAvgVisible: true });
  }

  handleStart() {
    this.setState({ isAvgVisible: false, isScoreVisible: false });
  }

  handleSubmit(event) {
    var savedAns = this.fetchData();

    event.preventDefault();
    const fd = new FormData(event.target);
    const formEntries = Object.fromEntries(fd.entries());
    const score =
      (100 *
        Object.entries(formEntries).filter((item) => item[1] === "yes")
          .length) /
      Object.entries(formEntries).length;

    this.setState({ score: score, isVisible: true });

    if (savedAns.length === 0) {
      savedAns = [Object.fromEntries(fd.entries())];
    } else {
      savedAns = [Object.fromEntries(fd.entries()), ...savedAns];
    }

    localStorage.setItem("answers", JSON.stringify(savedAns));
    this.setState({ isAvgVisible: true, isScoreVisible: true });
    this.updateAverage(savedAns);
  }

  render() {
    const { score, isScoreVisible, isAvgVisible, average } = this.state;
    return (
      <div className="main__wrap">
        <main className="container">
          <div className="text-center">
            <h1>QUESTIONS QUIZ</h1>
          </div>
          {isAvgVisible ? (
            <>
              {isScoreVisible && (
                <div>
                  <h3>Your Score: {score}</h3>
                </div>
              )}
              <div>
                <button type="button" onClick={this.handleStart.bind(this)}>
                  {isScoreVisible ? "Repeat Quiz" : "Start Quiz"}
                </button>
                <h3>Average for all runs so far</h3>
                <p>{Math.round(average)}</p>
              </div>
            </>
          ) : (
            <section>
              <form onSubmit={this.handleSubmit.bind(this)}>
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
              </form>
            </section>
          )}
        </main>
      </div>
    );
  }
}

export default App;
