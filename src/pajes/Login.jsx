import { useEffect, useState } from 'react'
import Form from '../Components/Form/Form'

import { useNavigate } from 'react-router-dom'
import './login.css'

const Login = () => {
  const [data, setData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    if (data.email) {
      fetch('https://vica.website/api/task-login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          localStorage.setItem('token', `Bearer ${res.token}`)
          navigate('/dashboard')
        })
        .catch((err) => console.log(err))
    }
  }, [data])
  const inputs = [
    { type: 'email', placeholder: 'Email', name: 'email', label: 'email' },
    { type: 'password', placeholder: '******', name: 'password', label: 'password' }
  ]
  return (
    <div className='login-page'>
      <Form
        title='sign In'
        discraption='Please enter your email and password to continue'
        inputs={inputs}
        submit='sign in'
        className='login-pag'
        formFooter={{
          content: 'Don’t have an account? ',
          url: '/register',
          LinkContent: 'Sing In'
        }}
        setData={setData}
      />
    </div>
  )
}

export default Login
