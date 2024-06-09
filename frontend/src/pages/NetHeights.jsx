import { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import '../styles/Uploads.css';
import axios from 'axios';
import Dropdown from '../components/Dropdown';
import '../styles/LoadingCircle.css';
import '../styles/Popup.css';
import '../styles/NetHeights.css'
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"

const NetHeights = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const handleGenerateNetHeightFile = async () => {
        const fileInput = fileInputRef.current;
        if (!fileInput || !fileInput.files[0]) {
            console.error('No file selected');
            return;
        }
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        setLoading(true);

        try {
            const response = await axios.post('https://psa.gamedaysetup.org/api/net_height/generate_net_height_file/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                responseType: 'blob'  // Ensure response is treated as a blob
            });
            if (response.status === 200) {
                // Log success message
                console.log('Net Height Excel generated successfully.');
                // Download the file
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'net_height.xlsx');
                document.body.appendChild(link);
                link.click();
                setShowPopup(true); 
            } else {
                console.error('Failed to generate net height Excel');
            }
        } catch (error) {
            console.error('Error generating net height Excel:', error);
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
        <div className="top">
            <Dropdown className="dropdown" />
            <button className='sign-out-button' type="button" onClick={handleLogout} style={{ whiteSpace: 'nowrap' }} >
                Sign Out
            </button>
        </div>
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
        </Card>
        <br></br>
        <a href="/">Home</a>
        {loading && <div className="loading-circle"></div>}
        {showPopup && (
        <div className="popup">
            <div className="popup-content">
                <button className="close-button" onClick={handleClosePopup}>x</button>
                <p>Net Heights File Created. <a href="/game-sheets">Click here to Create Game Sheets</a></p>
            </div>
        </div>
        )}
        </>
    );
};

export default NetHeights;
