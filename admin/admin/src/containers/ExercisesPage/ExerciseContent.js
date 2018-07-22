/*
 *
 * ComingSoonPage
 *
 */

import React, { Component } from "react"
import { connect } from "react-redux"
import Helmet from "react-helmet"
import Input from "../../components/Input"
import Dropdown from "../../components/Dropdown"
import QuestionsList from "./QuestionsList"

import styles from "./styles.scss"

export class ExercisesPage extends Component {
  constructor() {
    super()

    this.state = {
      title: "",
      timeLimitation: null
    }
  }

  _handleChangeQuestions = questions => {
    const { onChange } = this.props
    const { timeLimitation, title } = this.state

    this.questions = questions
    onChange({
      title,
      timeLimitation,
      questions
    })
  }

  _handleChangeTime = e => {
    return this.setState(
      {
        timeLimitation: e.target.value
      },
      () => {
        this.props.onChange({
          title: this.state.title,
          timeLimitation: this.state.timeLimitation,
          questions: this.questions
        })
      }
    )
  }

  _handleChangeTitle = e => {
    return this.setState(
      {
        title: e.target.value
      },
      () => {
        this.props.onChange({
          title: this.state.title,
          timeLimitation: this.state.timeLimitation,
          questions: this.questions
        })
      }
    )
  }

  render() {
    const { title, timeLimitation } = this.state

    return (
      <div className="row">
        <div className="col-lg-12">
          <div className={styles.sectionContainer}>
            <div className={styles.contentContainer}>
              <div className="row">
                <Input
                  label="Exercise Title"
                  name="title"
                  value={title}
                  onChange={this._handleChangeTitle}
                />
                <Input
                  label="Time Limitation (minutes)"
                  name="timeLimitation"
                  type="number"
                  value={timeLimitation}
                  onChange={this._handleChangeTime}
                />
                <QuestionsList onChange={this._handleChangeQuestions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ExercisesPage
