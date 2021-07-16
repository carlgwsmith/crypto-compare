import React, {useRef, useState} from 'react'
import {InputGroup, Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth} from '../Context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { BsEyeSlash } from "react-icons/bs";
import {FaRegEye} from "react-icons/fa"

export default function Signup(){
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [passwordShown, setPasswordShown] = useState(false);
    const [open, setOpen] = useState(<BsEyeSlash size="1.2em"/>);
    const {signup} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

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
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/Dashboard')
        } catch (error) {
            setError('Failed to create account')
        }
        setLoading(false)
    }

    return(
        <div>
        <Card>
            <Card.Body>
                <h3 className="text-center mb-0">Join <span style={{fontWeight: "300"}}>Crypto</span>Compare Today</h3>
                <p className="suSubtitle text-center">Make your own portfolio and analyze coin performance</p>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" ref={emailRef} placeholder="Enter Your Email Address" required />
                    </Form.Group>
                    <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                        <InputGroup>
                        <Form.Control type={passwordShown ? "text" : "password"} ref={passwordRef} className="passwordField" placeholder="Enter Your Password" required />
                        <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                            <span><i onClick={togglePasswordVisiblity}>{open}</i>{" "}</span>
                            </InputGroup.Text>
                        </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <InputGroup>
                        <Form.Control type={passwordShown ? "text" : "password"} ref={passwordConfirmRef} className="passwordField" placeholder="Confirm Your Password" required />
                        <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">
                            <span><i onClick={togglePasswordVisiblity}>{open}</i>{" "}</span>
                            </InputGroup.Text>
                        </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    <Button disabled={loading} type="submit" className="w-100 signupbtn">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        </div>
    )
}
