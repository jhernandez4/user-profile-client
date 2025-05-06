import { useState } from 'react';
import './SignUpPage.css';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    birthday: '',
    biography: '',
    favorite_number: '',
    password: '',
    profile_picture: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile_picture') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <label>Username*</label>
        <input type="text" name="username" required minLength="1" maxLength="30" onChange={handleChange} />

        <label>Email*</label>
        <input type="email" name="email" required maxLength="255" onChange={handleChange} />

        <label>Password*</label>
        <input type="password" name="password" required minLength="1" onChange={handleChange} />

        <label>First Name*</label>
        <input type="text" name="first_name" required minLength="1" onChange={handleChange} />

        <label>Last Name*</label>
        <input type="text" name="last_name" required minLength="1" onChange={handleChange} />

        <label>Birthday*</label>
        <input type="date" name="birthday" required onChange={handleChange} />

        <label>Biography*</label>
        <textarea name="biography" maxLength="255" required onChange={handleChange}></textarea>

        <label>Favorite Number*</label>
        <input type="number" name="favorite_number" required onChange={handleChange} />

        <label>Profile Picture {`(optional)`}</label>
        <input type="file" name="profile_picture" accept="image/*" onChange={handleChange} />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignUpPage;
