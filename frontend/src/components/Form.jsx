import { useState } from "react"
import api from '../api'
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import '../styles/Form.css'
import PropTypes from 'prop-types';

function Form({route, method}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === 'login' ? "Login" : "Register"
    // const name2 =  method === "login" ? "Create an Account" : "Sign Into Account"

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const res = await api.post(route, {username, password})
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate('/')
            } else {
                navigate('/login')
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    // const Register = () => {
    //     setLoading(true)
    //     if (method === 'login') {
    //         navigate('/register')
    //     } else {
    //         navigate('/login')
    //     }
    // }

  return (
   <form onSubmit={handleSubmit} className="form-container">
        <h2>{name}</h2>
        <input 
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <input 
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        <button className="form-button" type="submit">
        {loading ? 'Signing In...' : [name]}
        </button>

        {/* <button className="form-button" onClick={Register}> 
            {name2}
        </button> */}
   </form>
  )
}

Form.propTypes = {
    route: PropTypes.node.isRequired,
    method: PropTypes.node.isRequired,
};

export default Form