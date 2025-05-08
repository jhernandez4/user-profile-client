import { useState } from 'react'
import './App.css'

function App() {

  return (
    <div className="landing-container">
      <header className="brand-header">
        <h1>Usura</h1>
        <a href="/signup" className="landing-btn">Register with Usura Today!</a>
      </header>
      <section className="cta-section">
        <h2>USER PROFILES</h2>
        <h2>ARE A MESS</h2>
        <div className="cta-subtext">
          <h3>We organize them so you don't have to.</h3>
          <h3>Create your profile now.</h3>
        </div>
      </section>
      <h3>I want to:</h3>
      <div className="landing-btn-group">
        <a href="/signup" className="landing-btn primary-landing-btn">Sign Up</a>
        <a href="/login" className="landing-btn secondary-landing-btn">Log In</a>
      </div>
    </div>
  )
}

export default App
