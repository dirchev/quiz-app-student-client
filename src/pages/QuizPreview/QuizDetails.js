import React, { Component } from "react"
import MultilineText from "../../components/MultilineText";

class QuizDetails extends Component {
  render() {
    return (
      <section>
        <h1>{this.props.quiz.name}</h1>
        <MultilineText text={this.props.quiz.description} />
        <p>
          You have <strong>{this.props.quiz.noOfAttempts}</strong> attempts for this quiz.
          {
            this.props.quiz.isMandatory
            ? (
              <span>The quiz is <strong>mandatory</strong>.</span>
            ) : null
          }
        </p>
        {
          this.props.quiz.timeLimit
          ? (
            <p>This quiz is time limited. You have <strong>{this.props.quiz.timeLimit}</strong> minutes to complete. The time will start counting from the moment you see the first question.</p>
          ) : null
        }
      </section>
    )
  }
}

export default QuizDetails
