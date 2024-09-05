import Form from '../components/Form'


function Login() {
  return (
    <>
    <h1>Game Sorter</h1>
    This system is for PSA employees only.  Any other access is prohibited.
    <Form route='/api/token/' method='login' />
    </>
  )
}

export default Login