import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth} from '../Context/AuthContext'
import { Link } from 'react-router-dom'

export default function ForgotPassword(){
    const emailRef = useRef()
    const {resetPassword} = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox please')
        } catch {
            setError('Failed to reset password')
        }
        setLoading(false)
    }

    return(
        <div>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Reset Your Password</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Button disabled={loading} type="submit" className="w-100">Reset Password</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
                Need an account? <Link to="/Results">Sign Up</Link>
            </div>
        </div>
    )
}
