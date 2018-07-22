import React, { Component } from "react"
import Modal from "react-modal"
import Editor from "react-ckeditor-component"
import styles from "./styles.scss"
import TextArea from "../../components/TextArea"
import Dropdown from "../../components/Dropdown"
import OneChoiceAnswerList from "./OneChoiceAnswerList"
import MultiChoiceAnswerList from "./MultiChoiceAnswerList"
import FIBAnswerList from "./FIBAnswerList"

const types = [
  {
    label: "One Choice",
    value: "oneChoice"
  },
  {
    label: "Multiple Choice",
    value: "multipleChoice"
  },
  {
    label: "Fill In The Blank",
    value: "fillInTheBlank"
  }
]

class AddQuestionModal extends Component {
  state = {
    type: types[0].value,
    questions: [],
    content: ""
  }

  _handleChangeType = e => {
    this.setState({
      type: e.target.value
    })
  }

  _handleChangeAnswers = answers => {
    this.answers = answers
  }

  generateAnswer = () => {
    const { type, answers, content } = this.state

    if (type === "oneChoice") {
      return (
        <OneChoiceAnswerList
          onSave={this._handleSaveQuestion}
          onChange={this._handleChangeAnswers}
        />
      )
    }

    if (type === "multipleChoice") {
      return (
        <MultiChoiceAnswerList
          onSave={this._handleSaveQuestion}
          onChange={this._handleChangeAnswers}
        />
      )
    }

    if (type === "fillInTheBlank") {
      return (
        <FIBAnswerList
          onSave={this._handleSaveQuestion}
          onChange={this._handleChangeAnswers}
          content={content}
        />
      )
    }
  }

  _handleSaveQuestion = () => {
    const { saveQuestion, onClose } = this.props
    const { content, type } = this.state

    saveQuestion({
      content,
      type,
      answers: this.answers
    })
    onClose()
  }

  _handleChangeContent = e => {
    this.setState({
      content: e.editor.getData()
    })
  }

  render() {
    const { isOpen, onClose } = this.props
    const { type, content } = this.state

    return (
      <Modal isOpen={isOpen}>
        <h2>Add New Question</h2>
        <button className={styles.closeBtn} onClick={onClose}>
          X
        </button>
        <div>
          <div className={styles.buttonWrapper}>
            <button
              onClick={this._handleSaveQuestion}
              className={styles.saveBtn}
            >
              Save
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <Dropdown
              label="Type"
              name="type"
              options={types}
              value={type}
              onChange={this._handleChangeType}
            />
          </div>
          <div className="col-lg-12">
            <label>Question</label>
            <Editor
              content={content}
              events={{
                change: this._handleChangeContent
              }}
            />
          </div>
          {this.generateAnswer()}
        </div>
      </Modal>
    )
  }
}

export default AddQuestionModal
