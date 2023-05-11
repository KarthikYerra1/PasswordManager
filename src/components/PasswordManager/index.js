import {Component} from 'react'

import {v4} from 'uuid'

import './index.css'

import PasswordItem from '../PasswordItem'

const initialBackgroundColorsClassNames = [
  'violet',
  'green',
  'teal',
  'orange',
  'red',
  'blue',
  'yellow',
  'sky-blue',
]

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    isCheckBoxClicked: false,
    passwordsList: [],
  }

  onChangeWebsiteName = event => {
    this.setState({
      websiteInput: event.target.value,
    })
  }

  onChangeUserName = event => {
    this.setState({
      usernameInput: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  addPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const backgroundClassNames = `initial-container ${
      initialBackgroundColorsClassNames[
        Math.ceil(Math.random() * initialBackgroundColorsClassNames.length - 1)
      ]
    }`

    const newPasswordEntry = {
      id: v4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      className: backgroundClassNames,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPasswordEntry],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  deleteIconClicked = id => {
    const {passwordsList} = this.state
    const filteredPasswordsList = passwordsList.filter(each => each.id !== id)

    this.setState({
      passwordsList: filteredPasswordsList,
    })
  }

  showNoPasswordsView = () => (
    <div className="no-passwords-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        className="no-passwords"
        alt="no passwords"
      />
      <p className="no-passwords-text">No Passwords</p>
    </div>
  )

  showPasswords = showPasswordsList => {
    const {isCheckBoxClicked} = this.state
    return (
      <ul className="passwords-show-container">
        {showPasswordsList.map(eachPassword => (
          <PasswordItem
            key={eachPassword.id}
            isCheckBoxClicked={isCheckBoxClicked}
            details={eachPassword}
            deleteIconClicked={this.deleteIconClicked}
          />
        ))}
      </ul>
    )
  }

  toggleCheckBoxClicked = () => {
    this.setState(prevState => ({
      isCheckBoxClicked: !prevState.isCheckBoxClicked,
    }))
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      passwordsList,
      searchInput,
    } = this.state

    const showPasswordsList = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />

        <div className="inputs container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-image-sm"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-image-lg"
          />
          <form className="form-container" onSubmit={this.addPassword}>
            <h1 className="form-heading">Add New Password</h1>
            <div className="input-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="icon-image"
                />
              </div>
              <input
                className="input-element"
                value={websiteInput}
                placeholder="Enter Website"
                onChange={this.onChangeWebsiteName}
                type="text"
              />
            </div>
            <div className="input-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="icon-image"
                />
              </div>
              <input
                className="input-element"
                value={usernameInput}
                placeholder="Enter Username"
                onChange={this.onChangeUserName}
                type="text"
              />
            </div>
            <div className="input-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="icon-image"
                />
              </div>
              <input
                className="input-element"
                value={passwordInput}
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                type="password"
              />
            </div>
            <div className="add-button-container">
              <button className="add-btn" type="submit">
                Add
              </button>
            </div>
          </form>
        </div>
        {/* creating down container */}
        <div className="container passwords-view">
          <div className="password-length-container">
            <div className="password-lengths-container">
              <h1 className="your-passwords-text">Your Passwords</h1>
              <p className="password-count">{showPasswordsList.length}</p>
            </div>

            <div className="search-container">
              <div className="search-icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon-image"
                />
              </div>
              <input
                className="search-input-element"
                value={searchInput}
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                type="search"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="passwords-tick">
            <input
              id="show-passwords"
              type="checkbox"
              className="password-show-tick"
              onChange={this.toggleCheckBoxClicked}
            />
            <label htmlFor="show-passwords" className="show-passwords-text">
              Show Passwords
            </label>
          </div>
          {showPasswordsList.length === 0
            ? this.showNoPasswordsView()
            : this.showPasswords(showPasswordsList)}
        </div>
      </div>
    )
  }
}

export default PasswordManager
