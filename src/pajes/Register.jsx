import { useEffect, useState } from 'react'
import Form from '../Components/Form/Form'
import { useNavigate } from 'react-router-dom'
import './register.css'
const Register = () => {
  const [data, setData] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    if (Object.keys(data).length === 0) return

    const formData = new FormData()
    formData.append('first_name', data.first_name)
    formData.append('last_name', data.last_name)
    formData.append('user_name', data.user_name)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('password_confirmation', data.password_confirmation)
    formData.append('profile_image', data.profile_image)
    fetch('https://vica.website/api/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        localStorage.setItem('token', `Bearer ${res.data.token}`)
        navigate('/dashboarad')
      })
      .catch((err) => console.log(err))
  }, [data])

  const inputs = [
    { type: 'text', placeholder: 'first name', name: 'first_name', label: 'first name' },
    { type: 'text', placeholder: 'last name', name: 'last_name', label: 'last name' },
    { type: 'email', placeholder: 'example@email.com', name: 'email', label: 'email' },
    { type: 'password', placeholder: '********', name: 'password', label: 'password' },
    {
      type: 'password',
      placeholder: ' confirmation',
      name: 'password_confirmation',
      label: ' confirmation'
    },
    { type: 'file', placeholder: 'profile image', name: 'profile_image', label: 'profile image' }
  ]

  return (
    <div>
      <div className='register'>
        <Form
          title='sign up'
          inputs={inputs}
          submit='sign up'
          formFooter={{ content: 'do you have account ?', url: '/', LinkContent: 'login' }}
          setData={setData}
          className='register-pag'
        />
      </div>
    </div>
  )
}

export default Register
