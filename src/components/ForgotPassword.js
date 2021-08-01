import React, {useEffect, useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth} from '../Context/AuthContext'
import { Link } from 'react-router-dom'

export default function ForgotPassword(props){
    const emailRef = useRef()
    const {resetPassword} = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [remember, setRemember] = useState(true)
 
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

    function passForgotAction(){
        setRemember(false)
    }

    useEffect(() => {
        props.sendDataToParent2(remember);
    }, [remember]);

    return(
        <div>
        <Card className="loginCard">
            <Card.Body className="loginCardBody">
            <h2 className="mb-0">Having Trouble?</h2>
                <p className="name mb-4" style={{padding:"10px 0px 0px 5px"}}>Input the email associated with your account.</p>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Button disabled={loading} type="submit" className="w-100">Reset Password</Button>
                </Form>
                <div className="w-100 text-center">
                    <p className="passwordReset"><Link onClick={passForgotAction}>Don't need help? Login</Link></p>
                </div>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2 pb-4'>
                Need an account? <Link to="/Home">Sign Up</Link>
            </div>
        </div>
    )
}
