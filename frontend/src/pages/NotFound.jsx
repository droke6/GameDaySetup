import video from '../assets/flamingos.mp4'
import '../styles/Form.css'

function NotFound() {
  return (
    <div className='not-found'>
      <video src={video} autoPlay loop muted
      style={{ width: 700, height: 'auto' }}/>

      <a href="/">Return to Home</a>
    </div>
  )
}

export default NotFound