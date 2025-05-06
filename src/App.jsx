import { useState } from 'react'
import './App.css'

function App() {

  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1>Welcome</h1>
        <p>Please choose an option below:</p>
        <div className="button-group">
          <a href="/signup" className="btn primary-btn">Sign Up</a>
          <a href="/login" className="btn secondary-btn">Log In</a>
        </div>
      </div>
    </div>
  )
}

export default App
