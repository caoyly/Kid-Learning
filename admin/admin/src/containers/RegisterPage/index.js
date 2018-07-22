import React, { Component } from "react"
import styles from "./styles.scss"
import api from "../../utils/api"

const parseFormData = data => {
  const formData = new FormData()

  for (let i in data) {
    if (data.hasOwnProperty(i) && data[i] !== undefined && data[i] !== "") {
      formData.append(i, data[i])
    }
  }

  return formData
}

class RegisterPage extends Component {
  constructor() {
    super()

    this.state = {
      name: "",
      password: "",
      type: "student",
      address: "",
      avatar: "",
      roles: null,
      email: ""
    }
  }

  componentDidMount() {
    fetch(api.LIST_TYPES).then(async res => {
      const data = await res.json()

      this.setState({
        roles: data.roles
      })
    })
  }

  resetState = () => {
    this.setState({
      name: "",
      password: "",
      type: "student",
      address: "",
      avatar: "",
      email: ""
    })
  }

  _handleChangeName = e => {
    this.setState({
      name: e.target.value
    })
  }

  _handleChangePassword = e => {
    this.setState({
      password: e.target.value
    })
  }

  _handleChangeAddress = e => {
    this.setState({
      address: e.target.value
    })
  }

  _handleChangeType = e => {
    this.setState({
      type: e.target.value
    })
  }

  // _handleUploadPhoto = e => {
  //   if (e.target.files && e.target.files[0]) {
  //     const reader = new FileReader()
  //     const { files } = e.target

  //     reader.onload = e => {
  //       const { result } = e.target

  //       this.setState({
  //         avatar: result
  //       })
  //     }

  //     reader.readAsDataURL(files[0])
  //   }
  // }

  _handleChangeEmail = e => {
    this.setState({
      email: e.target.value
    })
  }

  _handleSubmitForm = e => {
    e.preventDefault()

    const { name, password, address, type, roles, avatar, email } = this.state

    fetch(api.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        username: email,
        password,
        address,
        type,
        avatar,
        provider: "local"
      })
    })
      .then(res => {
        console.log(res)

        this.resetState()

        setTimeout(() => {
          window.location.href = "/admin/plugins/users-permissions/auth/login"
        }, 1500)
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    const { name, password, address, type, email } = this.state

    return (
      <div>
        <h1 className={`text-center ${styles.title}`}>Register</h1>
        <div className={styles.container}>
          <form onSubmit={this._handleSubmitForm}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                autoComplete="email"
                value={email}
                onChange={this._handleChangeEmail}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={this._handleChangePassword}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                autoComplete="name"
                value={name}
                onChange={this._handleChangeName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                autoComplete="street-address"
                placeholder="Address"
                value={address}
                onChange={this._handleChangeAddress}
              />
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="type">Type</label>
                <select
                  className="form-control"
                  id="type"
                  value={type}
                  onChange={this._handleChangeType}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
              {/* <div className="form-group col-md-6">
                <label htmlFor="avatar">Avatar</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="avatar"
                  onChange={this._handleUploadPhoto}
                />
              </div> */}
            </div>

            <div className={`text-center ${styles.btnWrapper}`}>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default RegisterPage
