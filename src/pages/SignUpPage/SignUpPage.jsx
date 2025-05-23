import { useState } from 'react';
import './SignUpPage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CircleAlert } from 'lucide-react';

const SignUpPage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
      // If no file is selected, set the profile picture to null
      const selectedFile = files && files[0] ? files[0] : null;
      setFormData({ ...formData, [name]: selectedFile });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      const payload = new FormData();

      for (const key in formData) {
        // Only append profile_picture if it's not null or an empty string
        if (key === 'profile_picture' && formData[key] !== null && formData[key] !== '') {
          payload.append(key, formData[key]);
        } else if (key !== 'profile_picture') {
          payload.append(key, formData[key]);
        }
      }

      const submitResponse = await axios.post(`${backendUrl}/users`, payload);
      console.log(submitResponse);
      setSuccess(true);
    } catch (error) {
      const errorDetail = error?.response?.data?.detail 

      if (errorDetail[0]?.type){
        if (errorDetail[0]?.type === "string_too_short") {
          setError(`${fieldsMap[editingField]} needs to be at least one character`)
        } else if (errorDetail[0]?.type === "value_error") {
          setError(errorDetail[0]?.ctx.reason)
        }
      }  else {
        setError(errorDetail || 'An error occurred while saving.');
      }

      console.log(error);
    } finally {
      setIsLoading(false);
    }
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

        <small className="profile-image-warning">
          <CircleAlert color="orange"/> Only JPG or JPEG files are allowed for profile pictures.
        </small>

        <button className='signup-form-button' type="submit" disabled={isLoading}>
          Register
        </button>

        <p className="auth-question">Already have an account? <Link to="/login">Log in</Link></p>
        {error &&
          <div className="error-message">{error}</div>
        }
        {success &&
          <div className="success-message">Account created successfully!</div>
        }
      </form>
    </div>
  );
};

export default SignUpPage;
