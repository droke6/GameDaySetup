// Basketball.jsx

import { useState, useRef } from 'react';
import axios from 'axios';
import { Form, Card } from 'react-bootstrap';
import Navbar from '../components/Navbar';

const Basketball = () => {
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

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
            const response = await axios.post('/api/basketball/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setPopupMessage('Game sheets created successfully. You can download them from your Downloads folder.');
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

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            <div className="top">
                <Navbar className="navbar" />
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
