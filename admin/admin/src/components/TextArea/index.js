import React, { Component } from "react"
import Editor from "react-ckeditor-component"

class TextArea extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: props.content || ""
    }
  }

  _handleChange = e => {
    this.setState({
      content: e.editor.getData()
    })
  }

  render() {
    const { content } = this.state

    return (
      <Editor
        content={content}
        events={{
          change: this._handleChange
        }}
      />
    )
  }
}

export default TextArea
