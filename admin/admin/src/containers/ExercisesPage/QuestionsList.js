import React, { Component } from "react"
import styles from "./styles.scss"
import CreateModal from "./AddQuestionModal"

class QuestionsList extends Component {
  state = {
    openModal: false,
    questions: []
  }

  generateContent = () => {
    const { questions } = this.state

    return questions.map((item, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.type}</td>
          <td dangerouslySetInnerHTML={{ __html: item.content }} />
          <td>{this.generateAnswer(item.answers)}</td>
        </tr>
      )
    })
  }

  generateAnswer = ans => {
    return (
      <ul>
        {ans.map((answer, index) => {
          return (
            <li
              key={`answer_${index}`}
              className={answer.isCorrect && styles.hightlight}
            >
              {answer.content || answer}
            </li>
          )
        })}
      </ul>
    )
  }

  _handleOpenModal = () => {
    this.setState({
      openModal: true
    })
  }

  _handleCloseModal = () => {
    this.setState({
      openModal: false
    })
  }

  _handleSaveQuestion = question => {
    const { questions } = this.state

    return this.setState(
      {
        questions: questions.concat(question)
      },
      () => {
        this.props.onChange(this.state.questions)
      }
    )
  }

  render() {
    const { openModal, questions } = this.state

    return (
      <div className="col-lg-12">
        <CreateModal
          isOpen={openModal}
          onClose={this._handleCloseModal}
          saveQuestion={this._handleSaveQuestion}
        />
        <h3>Questions</h3>
        <div className="pull-right">
          <button className={styles.saveBtn} onClick={this._handleOpenModal}>
            Add Question
          </button>
        </div>
        {questions && !!questions.length ? (
          <table className="table">
            <thead>
              <tr>
                <th />
                <th>Type</th>
                <th>Question</th>
                <th>Answer</th>
              </tr>
            </thead>
            <tbody>{this.generateContent()}</tbody>
          </table>
        ) : (
          <div>No question</div>
        )}
      </div>
    )
  }
}

export default QuestionsList
