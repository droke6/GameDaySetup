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
        <div>
        <button className='sign-out-button' type="button" onClick={handleLogout} style={{ whiteSpace: 'nowrap' }}>
          Sign Out
        </button>
        </div>
      </div>

      <div className="cards">

      <div className='left'>
        <MasterSchedule />
      </div>

      <div>
        <NetHeights />
        <GameSheets />
      </div>

      </div>

      <br></br>
      <a href="/">Home</a>
    </>
  );
}

export default Volleyball;
