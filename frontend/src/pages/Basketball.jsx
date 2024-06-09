import { useState, useRef } from 'react';
import axios from 'axios';
import { Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import '../styles/LoadingCircle.css';
import '../styles/Popup.css';
import '../styles/Basketball.css';
import '../styles/buttons.css';

const Basketball = () => {
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const navigate = useNavigate();

    const handleGenerateGameSheets = async () => {
        const fileInput = fileInputRef.current;
        if (fileInput.files.length === 0) {
            setPopupMessage('No file selected. Please select a file.');
            setShowPopup(true);
            return;
        }

        setLoading(true);
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/basketball/sort/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob',
            });

            if (response.status === 200) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'basketball_games.xlsx');
                document.body.appendChild(link);
                link.click();
                link.remove();

                setPopupMessage('Game sheets created successfully. The file has been downloaded.');
            } else {
                setPopupMessage(`Failed to create game sheets. Status code: ${response.status}`);
            }
        } catch (error) {
            if (error.response) {
                setPopupMessage(`Error: ${error.response.data.error || 'Failed to generate game sheets.'}`);
            } else {
                setPopupMessage('Failed to generate game sheets. Please try again.');
            }
            console.error('Error occurred while generating sheets:', error);
        } finally {
            setLoading(false);
            setShowPopup(true);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        navigate('/login');
      };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
        <div className="top">
            <button className='sign-out-button' type="button" onClick={handleLogout} style={{ whiteSpace: 'nowrap' }}>
            Sign Out
            </button>
        </div>
            <h1>Basketball Sheets</h1>
            <Card className='container'>
                <Card.Text>
                    <ul>
                        <h3>Upload a file from Assigner</h3>
                    </ul>
                </Card.Text>
                <hr />
                <div className='button-container'>
                    <div className='inputs'>
                        <Form.Group>
                            <Form.Control type='file' size='lg' ref={fileInputRef} />
                        </Form.Group>
                    </div>
                    <div className='button-wrapper'>
                        <button className='btn btn-primary' onClick={handleGenerateGameSheets} disabled={loading}>
                            {loading ? 'Loading...' : 'Create Sheets'}
                        </button>
                    </div>
                </div>
            </Card>
            <br />
            <a href="/">Home</a>
            <div className='bottom'>
                <button className='sign-out-button2' type="button" onClick={handleLogout}>
                Sign Out
                </button>
            </div>
            {loading && <div className="loading-circle"></div>}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <button className="close-button" onClick={handleClosePopup}>x</button>
                        <p>{popupMessage} <a href="/basketball">Click here to enter a new day.</a></p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Basketball;
