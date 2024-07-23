import { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import '../styles/Popup.css' 
import '../styles/Uploads.css';
import '../styles/buttons.css'

const MasterSchedule = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSortGames = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files[0]) {
      console.error('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('date1', document.getElementById('date1').value);
    formData.append('date2', document.getElementById('date2').value);
    formData.append('date3', document.getElementById('date3').value);

    setLoading(true);

    try {
      const response = await axios.post('https://psa.gamedaysetup.org/api/master_schedule/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

      if (response.status === 200) {
        console.log('File processed successfully');
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sorted.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setShowPopup(true);
      } else {
        console.error('Failed to process file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
};

// const handleLogout = () => {
//   localStorage.removeItem(ACCESS_TOKEN);
//   localStorage.removeItem(REFRESH_TOKEN);
//   navigate('/login');
// };

  return (
    <>
      <div>
      <h1>Schedule Sorter</h1>
      <Card className="container">
        <Card.Text>
          <ul>
          <h3>Type in Game Dates - MM/DD/YYYY</h3>
          </ul>
        </Card.Text>
        <hr />
        <div className="dates">
          <Form.Group>
            <Form.Label>Select Date 1:</Form.Label>
            <Form.Control type="text" id="date1" name="date1" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Select Date 2:</Form.Label>
            <Form.Control type="text" id="date2" name="date2" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Select Date 3:</Form.Label>
            <Form.Control type="text" id="date3" name="date3" />
          </Form.Group>
        </div>
        <br /><br />
        <hr />
        <Form.Label>Upload Master Schedule</Form.Label>
        <div className="button-container">
          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Control type="file" size="lg" ref={fileInputRef} />
          </Form.Group>
          <button className="btn btn-primary" onClick={handleSortGames} disabled={loading}>
            {loading ? 'Loading...' : 'Sort Games'}
          </button>
        </div>
      </Card>
      <br />
      {loading && <div className="loading-circle"></div>}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
          <button className="close-button" onClick={handleClosePopup}>x</button>
            <p>Games Sorted.</p>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default MasterSchedule;
