import { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Navbar from "../components/Navbar";
import '../styles/Basketball.css';
import '../styles/LoadingCircle.css';
import '../styles/Popup.css';

const Basketball = () => {
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const handleGenerateGameSheets = async () => {
        const fileInput = fileInputRef.current;

        if (!fileInput || fileInput.files.length === 0) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('files', fileInput.files[0]);

        setLoading(true);

        try {
            const response = await axios.post('https//psa.gamedaysetup.org/api/basketball/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                responseType: 'blob'
            });

            if (response.status === 200) {
                console.log('Basketball Sheets generated successfully.');
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                const contentDisposition = response.headers['content-disposition'];
                let fileName = 'sorted_basketball_games.xlsx';
                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
                    if (fileNameMatch && fileNameMatch.length === 2) fileName = fileNameMatch[1];
                }
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setPopupMessage('Basketball Games Sheets Created. Click here to enter a new day.');
                setShowPopup(true);
            } else {
                console.error('Failed to generate game sheets Excel, status:', response.status);
            }
        } catch (error) {
            console.error('Error occurred while generating sheets:', error);
            setPopupMessage('Failed to generate game sheets. Please try again.');
            setShowPopup(true);
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
