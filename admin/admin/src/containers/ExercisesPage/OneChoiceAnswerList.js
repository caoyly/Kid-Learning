import React, { Component } from "react"
import styles from "./styles.scss"

const EMPTY_ANSWER = {
  content: "",
  isCorrect: false
}

class OneChoiceAnswerList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      answers: [EMPTY_ANSWER]
    }
  }

  _handleNewAnswer = () => {
    const { answers } = this.state
    const { onChange } = this.props

    if (!!answers.length && !answers[answers.length - 1].content) {
      return null
    }

    return this.setState(
      {
        answers: answers.concat(EMPTY_ANSWER)
      },
      () => {
        this.props.onChange(this.state.answers)
      }
    )
  }

  _handleChangeCorrect = i => {
    const { answers } = this.state

    return this.setState(
      {
        answers: answers.map((item, index) => {
          if (i === index) {
            return {
              ...item,
              isCorrect: true
            }
          }

          return {
            ...item,
            isCorrect: false
          }
        })
      },
      () => {
        this.props.onChange(this.state.answers)
      }
    )
  }

  _handleChangeContent = (e, i) => {
    const { answers } = this.state
    const content = e.target.value

    return this.setState(
      {
        answers: answers.map((item, index) => {
          if (i === index) {
            return {
              ...item,
              content
            }
          }

          return item
        })
      },
      () => {
        this.props.onChange(this.state.answers)
      }
    )
  }

  render() {
    const { answers } = this.state

    return (
      <div className="col-lg-12" style={{ marginTop: 30 }}>
        <label>Answers</label>
        <button
          onClick={this._handleNewAnswer}
          className={`${styles.saveBtn} pull-right`}
        >
          Add answer
        </button>
        <table
          style={{
            width: "50%",
            margin: "0 auto"
          }}
          className={`${styles.answersList} table`}
        >
          <thead>
            <tr>
              <th>Content</th>
              <th className="text-center">Correct</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input
                      className="form-control"
                      onChange={e => this._handleChangeContent(e, index)}
                      value={item.content}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="radio"
                      name="correct"
                      value={item.key}
                      onClick={() => this._handleChangeCorrect(index)}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default OneChoiceAnswerList
