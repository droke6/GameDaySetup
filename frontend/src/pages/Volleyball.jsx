import Navbar from "../components/Navbar";
import Dropdown from '../components/Dropdown';
import '../styles/Home.css';

function Volleyball() {
  return (
    <>
    <div className="top">
      <Dropdown className="dropdown" />
      <Navbar className="navbar" />
    </div>
    <div>
      <h1>Volleyball Sheets</h1>
      <h2>Instructions</h2>
      <ul>
        <h3>Step 1: Download this week&apos;s Master Schedule from <a href="http://psareports.org/" target="blank">PSA Reports</a></h3>
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
