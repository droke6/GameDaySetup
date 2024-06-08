import Navbar from "../components/Navbar";
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  function navigateTo(path) {
      navigate(path)
  }

  return (
    <>
      <div className="top">
        <Navbar />
      </div>
      <div className="content">
        <h1>PSA Game Sorter 2.0</h1>
        <div className="buttons">
          <button className="game-button" onClick={() => navigateTo("/basketball")}>Basketball</button>
          <button className="game-button" onClick={() => navigateTo("/volleyball")}>Volleyball</button>
        </div>
      </div>
    </>
  );
}

export default Home;
