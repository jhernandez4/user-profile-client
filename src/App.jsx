import { useState } from 'react'
import './App.css'

function App() {

  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1>Welcome</h1>
        <p>Please choose an option below:</p>
        <div className="landing-btn-group">
          <a href="/signup" className="landing-btn primary-landing-btn">Sign Up</a>
          <a href="/login" className="landing-btn secondary-landing-btn">Log In</a>
        </div>
      </div>
    </div>
  )
}

export default App
