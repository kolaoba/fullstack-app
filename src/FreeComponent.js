import React, { useEffect, useState  } from "react";
import axios from "axios";



export default function FreeComponent() {

    const [message, setMessage] = useState("");

    useEffect(() => {
        // set configurations fro the API call
        const configuration = {
            method: "get",
            url: "https://fullstack-auth-app1.herokuapp.com/free-endpoint",
        };
        // make the API call
    axios(configuration)
    .then((result) => {
        //assign message in our result to message initialised in setMessage
        setMessage(result.data.message);
    })
    .catch((error) => {
        error = new Error();
    });
    }, [])

    
    return (
        <div>
            <h1 className="text-center">Free Component</h1>
            <h3 className="text-center text-danger">{message}</h3>
        </div>
    );
}