import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState } from 'react';
import '../styles/Volleyball.css';
import '../styles/bootstrap-dropdown.css';
import '../styles/buttons.css'

import MasterSchedule from './MasterSchedule'
import NetHeights from './NetHeights'
import GameSheets from './GameSheets'

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
        {/* <div className="dropdown-button" onClick={toggleDropdown} tabIndex={0} onBlur={() => setDropdownOpen(false)}>
          <button className="btn btn-secondary">Volleyball Options...</button>
          <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
          <div className="dropdown-item" onClick={() => navigate('/master-schedule')}>Sort Master Schedule</div>
          <div className="dropdown-item" onClick={() => navigate('/net-heights')}>Set Net Heights</div>
          <div className="dropdown-item" onClick={() => navigate('/game-sheets')}>Create Game Sheets</div>
        </div>
        </div> */}
        <div>
        <button className='sign-out-button' type="button" onClick={handleLogout} style={{ whiteSpace: 'nowrap' }}>
          Sign Out
        </button>
        </div>
      </div>
      <MasterSchedule />
      <NetHeights />
      <GameSheets />

      {/* <div>
        <h1>Volleyball Sheets</h1>
        <h2>Instructions</h2>
        <ul>
          <h3>Step 1: Download this week&apos;s Master Schedule from <a href="http://psareports.org/" target="_blank">PSA Reports</a></h3>
          <h3>Step 2: <a href="/master-schedule">Sort the Master Schedule.</a></h3>
          <h3>Step 3: <a href="/net-heights">Set the Net Heights.</a></h3>
          <h3>Step 4: <a href="/game-sheets">Create the Game Sheets.</a></h3>
        </ul>
        <br />
        <a href="/">Home</a>
      </div>
      <div className='bottom'>
        <button className='sign-out-button2' type="button" onClick={handleLogout} style={{ whiteSpace: 'nowrap' }}>
          Sign Out
        </button>
      </div> */}
    </>
  );
}

export default Volleyball;
