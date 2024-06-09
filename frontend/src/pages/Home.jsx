import Navbar from "../components/Navbar";
import '../styles/Home.css';
import '../styles/buttons.css'
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"

function Home() {
  const navigate = useNavigate();

  function navigateTo(path) {
      navigate(path)
  }

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    navigate('/login');
  };

  return (
    <>
      <div className="top">
      <button className='sign-out-button' type="button" onClick={handleLogout} style={{ whiteSpace: 'nowrap' }}>
          Sign Out
        </button>
      </div>
      <div className="content">
        <h1>PSA Game Sorter</h1>
        <h4>Choose a sport.</h4>
        <div className="buttons">
          <button className="game-button" onClick={() => navigateTo("/basketball")}>Basketball</button>
          <button className="game-button" onClick={() => navigateTo("/volleyball")}>Volleyball</button>
        </div>
        <div className='bottom'>
            <button className='sign-out-button2' type="button" onClick={handleLogout} style={{ whiteSpace: 'nowrap' }}>
                Sign Out
            </button>
        </div>
      </div>
    </>
  );
}

export default Home;
