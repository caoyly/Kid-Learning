import React, { Component } from "react"
import styles from "./styles.scss"

const generateListAnswers = (content, answers = []) => {
  const count = content.split("|__|").length - 1
  const results = []

  if (count < 1) {
    return []
  }

  if (count < answers.length) {
    return answers.filter((item, index) => index < count)
  }

  for (let i = 0; i < count; i++) {
    if (answers[i]) {
      results[i] = answers[i]
    } else {
      results[i] = ""
    }
  }

  return results
}

class FIBAnswerList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      answers: generateListAnswers(props.content)
    }

    props.onChange(generateListAnswers(props.content))
  }

  _handleChangeContent = (e, index) => {
    const { answers } = this.state

    this.setState(
      {
        answers: answers.map((item, i) => {
          if (i === index) {
            return e.target.value
          }

          return item
        })
      },
      () => {
        this.props.onChange(this.state.answers)
      }
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.content !== this.props.content) {
      const answers = generateListAnswers(nextProps.content, this.state.answers)

      this.setState(
        {
          answers
        },
        () => {
          this.props.onChange(this.state.answers)
        }
      )
    }
  }

  render() {
    const { answers } = this.state

    return (
      <div className="col-lg-12" style={{ marginTop: 30 }}>
        <label>Answers</label>
        <table
          style={{
            width: "50%",
            margin: "0 auto"
          }}
          className={`${styles.answersList} table`}
        >
          <thead>
            <tr>
              <th>Key</th>
              <th className="text-center">Content</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      className="form-control"
                      onChange={e => this._handleChangeContent(e, index)}
                      value={item}
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

export default FIBAnswerList
