import "./NavBar.css"

const NavBar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">Messaging App</h1>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <span className="welcome-message">Welcome back, {user.name}</span>
            <button className="logout-button" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <span className="placeholder">Not logged in</span>
        )}
      </div>
    </nav>
  )
}

export default NavBar
