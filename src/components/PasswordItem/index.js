import './index.css'

const PasswordItem = props => {
  const {details, isCheckBoxClicked, deleteIconClicked} = props
  const {id, website, username, password, className} = details

  const initial = website[0].toUpperCase()

  const onClickDelete = () => {
    deleteIconClicked(id)
  }

  return (
    <li className="password-item-container">
      <div className={className}>
        <p className="initial">{initial}</p>
      </div>
      <div className="details-container">
        <p className="text-details">{website}</p>
        <p className="text-details">{username}</p>
        {isCheckBoxClicked ? (
          <p className="text-details">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="password-stars"
          />
        )}
      </div>

      <button
        className="btn"
        data-testid="delete"
        type="button"
        onClick={onClickDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          className="delete-icon"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
