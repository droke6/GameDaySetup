import '../styles/Volleyball.css';
import '../styles/bootstrap-dropdown.css'; // Import custom dropdown CSS
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState } from 'react';

function Volleyball() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <div className="top">
        <div className="dropdown-button" onClick={toggleDropdown} tabIndex={0} onBlur={() => setDropdownOpen(false)}>
          <button className="btn btn-secondary">Select an option...</button>
          <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
            <div className="dropdown-item" onClick={() => console.log('Action 1 clicked')}>Action</div>
            <div className="dropdown-item" onClick={() => console.log('Another action clicked')}>Another action</div>
            <div className="dropdown-item" onClick={() => console.log('Something else clicked')}>Something else</div>
          </div>
        </div>
        <button className='sign-out-button' type="button" onClick={handleLogout} style={{ whiteSpace: 'nowrap' }}>
          Sign Out
        </button>
      </div>
      <div>
        <h1>Volleyball Sheets</h1>
        <h2>Instructions</h2>
        <ul>
          <h3>Step 1: Download this week's Master Schedule from <a href="http://psareports.org/" target="_blank">PSA Reports</a></h3>
          <h3>Step 2: <a href="/master-schedule">Sort the Master Schedule.</a></h3>
          <h3>Step 3: <a href="/net-heights">Set the Net Heights.</a></h3>
          <h3>Step 4: <a href="/game-sheets">Create the Game Sheets.</a></h3>
        </ul>
        <br />
        <a href="/">Home</a>
      </div>
    </>
  );
}

export default Volleyball;
