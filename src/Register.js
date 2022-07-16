import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";


export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit=(e)=>{
        setErrorMessage("");
        setSuccessMessage("");
        // prevent the form from refreshing the whole page
        e.preventDefault();
        // set configurations to link to backend
        const configuration = {
            method: "post",
            // url: "https://fullstack-auth-app1.herokuapp.com/register",
            url: "http://localhost:8080/register",
            data: {
                email,
                password,
            },
        };

        // make the API call
        axios(configuration)
        .then((result) => {setSuccessMessage(result?.data?.message);})
        .catch((error) => {setErrorMessage(error?.response?.data?.message);})
    }
    return (
        <>
        <h2>Register</h2>
        <Form onSubmit={(e)=>handleSubmit(e)}>
            {/* email */}
            <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter email'
             />
            </Form.Group>
            
            {/* password */}
            <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password' 
            />
            </Form.Group>

        
            {/* submit button */}
            <Button 
                variant="primary" 
                type="submit"
                onClick={(e)=>handleSubmit(e)}>
                Submit
            </Button>

            {/* display error message */}

                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                {successMessage && <p className="text-success">{successMessage}</p>}
                

        </Form>
        </>
    );
}