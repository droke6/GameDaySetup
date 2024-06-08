import { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import '../styles/Uploads.css';
import axios from 'axios';
import Navbar from "../components/Navbar";
import Dropdown from '../components/Dropdown';
import '../styles/LoadingCircle.css';
import '../styles/Popup.css';  // Import the CSS for the popup

const NetHeights = () => {
    const fileInputRef = useRef(null);
    const [showLogin, setShowLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState(null);  // Add error state

    const toggleForm = () => {
        setShowLogin(!showLogin);
    };

    const handleGenerateNetHeightFile = async () => {
        const fileInput = fileInputRef.current;
        if (!fileInput || !fileInput.files[0]) {
            console.error('No file selected');
            setError('No file selected');
            return;
        }
        const formData = new FormData();
        formData.append('files', fileInput.files[0]);  // Ensure the key is 'files' as expected by the backend

        setLoading(true);
        setError(null);  // Reset error state

        try {
            const response = await axios.post('https://psa.gamedaysetup.org/api/basketball/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                // Log success message
                console.log('Basketball files processed successfully.');
                setShowPopup(true); 
            } else {
                console.error('Failed to process basketball files');
                setError('Failed to process basketball files');
            }
        } catch (error) {
            console.error('Error processing basketball files:', error);
            setError('Error processing basketball files');
        } finally {
            setLoading(false);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
        <div className="top">
            <Dropdown className="dropdown" />
            <Navbar className="navbar" toggleForm={toggleForm} showLogin={showLogin} />
        </div>
        <h1>Net Heights</h1>
        <Card className='container'>
            <Card.Text>
            <ul>
            <h3>Upload Sorted Games File</h3>
            </ul>
            </Card.Text>
            <hr />
            <div className='button-container'>
                <Form.Group>
                    <Form.Control type='file' size='lg' ref={fileInputRef} />
                </Form.Group>
                <button className='btn btn-primary' onClick={handleGenerateNetHeightFile} disabled={loading}>
                    {loading ? 'Loading...' : 'Set Net Heights'}
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}  {/* Display error message */}
        </Card>
        <br></br>
        <a href="/">Home</a>
        {loading && <div className="loading-circle"></div>}
        {showPopup && (
        <div className="popup">
            <div className="popup-content">
                <button className="close-button" onClick={handleClosePopup}>x</button>
                <p>Net Heights Set. <a href="/game-sheets">Click here to Create Game Sheets</a></p>
            </div>
        </div>
        )}
        </>
    );
};

export default NetHeights;
