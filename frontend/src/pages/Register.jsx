import Form from '../components/Form'

function Register() {
  return (
    <>
    <h1>Game Sorter</h1>
    <Form route='/api/user/register/' method='register' />
    </>
  )
}

export default Register