import { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; // Import DatePicker
// import 'react-datepicker/dist/react-datepicker.css'; // Import Datepicker CSS
import '../styles/Popup.css';
import '../styles/Uploads.css';
import '../styles/buttons.css';

const MasterSchedule = () => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [dates, setDates] = useState({
    date1: null,
    date2: null,
    date3: null,
  });

  const handleDateChange = (date, field) => {
    setDates(prevDates => ({
      ...prevDates,
      [field]: date,
    }));
  };

  const navigate = useNavigate();

  const handleSortGames = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files[0]) {
      console.error('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('date1', dates.date1 ? dates.date1.toLocaleDateString() : '');
    formData.append('date2', dates.date2 ? dates.date2.toLocaleDateString() : '');
    formData.append('date3', dates.date3 ? dates.date3.toLocaleDateString() : '');

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

  return (
    <>
      <div>
        <h1>Schedule Sorter</h1>
        <Card className="container">
          <Card.Text>
            <ul>
              <h3>Select Game Dates</h3>
            </ul>
          </Card.Text>
          <hr />
          <div className="dates">
            <Form.Group>
              <Form.Label>Select Date 1:</Form.Label>
              <DatePicker
                selected={dates.date1}
                onChange={date => handleDateChange(date, 'date1')}
                dateFormat="MM/dd/yyyy"
                className="form-control"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Select Date 2:</Form.Label>
              <DatePicker
                selected={dates.date2}
                onChange={date => handleDateChange(date, 'date2')}
                dateFormat="MM/dd/yyyy"
                className="form-control"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Select Date 3:</Form.Label>
              <DatePicker
                selected={dates.date3}
                onChange={date => handleDateChange(date, 'date3')}
                dateFormat="MM/dd/yyyy"
                className="form-control"
              />
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
