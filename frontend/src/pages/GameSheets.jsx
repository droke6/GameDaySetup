import { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import '../styles/Uploads.css';
import axios from 'axios';
import Dropdown from '../components/Dropdown';
import '../styles/LoadingCircle.css'
import '../styles/Popup.css' 
import '../styles/LoadingCircle.css';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"


const GameSheets = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const handleGenerateGameSheets = async () => {
        const fileInput = fileInputRef.current;
        if (!fileInput || !fileInput.files[0]) {
            console.error('No file selected');
            return;
        }
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        
        setLoading(true);

        try {
            const response = await axios.post('https://psa.gamedaysetup.org/api/game_sheets/', formData, {  // Note the trailing slash
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                responseType: 'blob'
            });
            if (response.status === 200) {
                console.log('Game Sheets Excel generated successfully.');
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'game_sheets.xlsx');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setShowPopup(true);
            } else {
                console.error('Failed to generate game sheets Excel');
            }
        } catch (error) {
            console.error('Error generating game sheets Excel:', error);
        } finally {
            setLoading(false);
          }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        navigate('/login');
      };

    return (
        <>
        <div className="top">
            <Dropdown className="dropdown" />
            <button className='sign-out-button' type="button" onClick={handleLogout} style={{ whiteSpace: 'nowrap' }} >
                Sign Out
            </button>
        </div>
        <h1>Game Sheets</h1>
        <Card className='container'>
            <Card.Text>
                <ul>
                <h3>Select Sorted Games File</h3>
                </ul>
            </Card.Text>
            <hr />
            <div className='button-container'>
                <Form.Group>
                    <Form.Control type='file' size='lg' ref={fileInputRef} />
                </Form.Group>
                <button className='btn btn-primary' onClick={handleGenerateGameSheets} disabled={loading}>
                    {loading ? 'Loading...' : 'Create Sheets'}
                </button>
            </div>
        </Card>
        <br></br>
        <a href="/">Home</a>
        {loading && <div className="loading-circle"></div>}
        {showPopup && (
            <div className="popup">
            <div className="popup-content">
                <button className="close-button" onClick={handleClosePopup}>x</button>
                <p>Games Sheets Created. <a href="/">Click here to return to Home page.</a></p>
            </div>
            </div>
        )}
        </>
    );
};

export default GameSheets;
