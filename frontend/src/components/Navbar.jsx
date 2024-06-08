import { useState } from 'react';
import { RiMenu3Line, RiCloseLine} from 'react-icons/ri';
import '../styles/Navbar.css';
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"


const Links = () => (
  <>
  <p><a href="sort">Sort Master Schedule</a></p>
  <p><a href="net-heights">Set Net Heights</a></p>
  <p><a href="game-sheets">Create Game Sheets</a></p>
  </>
)

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    navigate('/login');
  };


  return (
    <div className="navbar">
      <button className='sign-out-button' type="button" onClick={handleLogout} style={{ whiteSpace: 'nowrap' }} >
        Sign Out
      </button>
    <div className="menu">
      {toggleMenu
        ? <RiCloseLine color='#040C18' size={27} onClick={() => setToggleMenu(false)}/>
        : <RiMenu3Line color='#040C18' size={27} onClick={() => setToggleMenu(true)}/>
      }
      {toggleMenu && (
        <div className="menu_container scale-up-center">
          <div className="uniforms_navbar-menu_container-links">
            <div className="menu_container-links_sign-out">
              <Links /> 
              <button type='sing-out-button' onClick={handleLogout}>Sign Out</button>
            </div>
          </div>
        </div>
      )}
    </div>
</div>
  )
}

Navbar.propTypes = {
  toggleForm: PropTypes.func.isRequired,
  showLogin: PropTypes.bool.isRequired,
};

export default Navbar