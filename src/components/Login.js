import React, {useRef, useState} from 'react'
import {InputGroup, Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth} from '../Context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { BsEyeSlash } from "react-icons/bs";
import {FaRegEye} from "react-icons/fa"

export default function Login(){
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [passwordShown, setPasswordShown] = useState(false);
    const [open, setOpen] = useState(<BsEyeSlash size="1.3em"/>);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
        if (passwordShown === true) {
          setOpen(<BsEyeSlash size="1.2em"/>);
        } else {
          setOpen(<FaRegEye size="1.2em"/>);
        }
      };

    async function handleSubmit(e){
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/Dashboard')
        } catch {
            setError('Failed to sign in')
        }
        setLoading(false)
    }

    return(
        <div>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email Address</Form.Label>
                        <InputGroup>
                        <Form.Control type="email" ref={emailRef} placeholder="Enter Your Email Address" required />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                        <Form.Control type={passwordShown ? "text" : "password"} className="passwordField" ref={passwordRef} placeholder="Enter Your Password" required />
                        <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                            <span><i onClick={togglePasswordVisiblity}>{open}</i>{" "}</span>
                            </InputGroup.Text>
                        </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    <Button disabled={loading} type="submit" className="w-100">Login</Button>
                </Form>
                <div className='w-100 text-center mt-3'>
                    Need an account? <Link to="/forgot-password">Forgot Password?</Link>
                </div>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
                Need an account? <Link to="/">Sign Up</Link>
            </div>
        </div>
    )
}
