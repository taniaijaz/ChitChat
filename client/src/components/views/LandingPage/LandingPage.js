import React from 'react'
import { FaCode } from "react-icons/fa";

function LandingPage() {
    return (
        <>
        <div className="app">
            <FaCode style={{ fontSize: '4rem' }} /><br />
            <span style={{ fontSize: '2rem' }}>Let's Start CHit-Chat!</span>
        </div>
        <div style={{ float:'right' }}>Thanks For using Chit-Chat</div>
        </>
    )
}

export default LandingPage
