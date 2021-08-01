import React, {useRef, useState, useEffect} from 'react'
import {InputGroup, Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth} from '../Context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { BsEyeSlash } from "react-icons/bs";
import {FaRegEye} from "react-icons/fa"

export default function Login(props){
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [passwordShown, setPasswordShown] = useState(false);
    const [passForgot, setPassForgot] = useState(false)
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

    function passForgotAction(){
        setPassForgot(true)
    }
    useEffect(() => {
        props.sendDataToParent(passForgot);
    }, [passForgot]);

    return(
        <div>
        <Card className="loginCard">
            <Card.Body className="loginCardBody">
                <h2 className="mb-0">Welcome Back</h2>
                <p className="name mb-5" style={{padding:"10px 0px 0px 5px"}}>Input out your credentials to login.</p>
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
                            <InputGroup.Text id="inputGroupAppend" className="passwordAppend">
                            <span><i onClick={togglePasswordVisiblity}>{open}</i>{" "}</span>
                            </InputGroup.Text>
                        </InputGroup.Append>
                        </InputGroup>
                        <p className="text-right passwordReset" onClick={passForgotAction}><Link>Forgot Password?</Link></p>
                    </Form.Group>
                    <Button disabled={loading} type="submit" className="w-100">Login</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-0 pb-3'>
        <div class="separator">OR</div>
                Need an account? <Link to="/Home">Sign Up</Link>
                
            </div>
        </div>
    )
}
