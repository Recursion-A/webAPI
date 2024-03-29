import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import config from '../config'

interface FormData {
  username: string
  password: string
}

const formHeadStyle: React.CSSProperties = {
  textAlign: 'center',
  borderBottom: '2px solid black',
  paddingBottom: '16px'
}

const formWrapStyle: React.CSSProperties = {
  padding: '16px 32px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

const formStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'start',
  flexDirection: 'column',
  gap: '24px'
}

const formItemStyle = {
  width: '100%'
}

const labelStyle = {
  fontSize: '48px'
}

const inputStyle = {
  background: '#fafafa',
  border: 'none',
  borderBottom: '2px solid #e9e9e9',
  color: '#666',
  fontFamily: 'Open Sans, sans-serif',
  fontSize: '32px',
  transition: 'border-color 0.3s',
  width: '100%',
  heigh: '48px',
  padding: '8px'
}

const buttonStyle: React.CSSProperties = {
  background: 'black',
  border: 'none',
  color: 'white',
  fontSize: '32px',
  cursor: 'pointer',
  height: '80px',
  width: '100%',
  marginTop: '40px'
}

const linkStyle = {
  display: 'inline-block',
  fontSize: '32px',
  fontWeight: 'bold',
  marginTop: '16px'
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: ''
  })
  const navigate = useNavigate()
  const { dispatch } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch(`${config.apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (!response.ok) {
        throw new Error('Login failed')
      }
      const data = await response.json()
      localStorage.setItem('token', data.token) // トークンをローカルストレージに保存
      dispatch({ type: 'LOGIN', payload: { token: data.token } })
      navigate('/') // ホームページにリダイレクト
    } catch (error) {
      console.error('Login error', error)
    }
  }

  return (
    <div style={formWrapStyle}>
      <h1 style={formHeadStyle}>ログイン</h1>
      <form style={formStyle} onSubmit={handleSubmit}>
        <div style={formItemStyle}>
          <label style={labelStyle}>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={formItemStyle}>
          <label style={labelStyle}>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <button style={buttonStyle} type="submit">
          Login
        </button>
      </form>
      <Link style={linkStyle} to="/signup">
        新規登録&#32;&#32;&#32;&gt;&gt;
      </Link>
    </div>
  )
}

export default LoginForm
