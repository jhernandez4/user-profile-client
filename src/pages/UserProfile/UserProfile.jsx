import { useEffect, useState } from 'react';
import './UserProfile.css';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const userToken = localStorage.getItem("access_token");
        const response = await axios.get(`${backendUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
        });
        console.log(response);
        setUser(response.data);
      } catch(error) {
        setError(error?.response?.data?.detail || 'An error occurred while logging in.');
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, [])

  if (isLoading) {
    <p>Loading profile</p>
  }

  if (error) {
    <p>Failed to load profile</p>
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-picture-wrapper">
          <img 
          src={`${backendUrl}${user?.profile_picture}`} 
          alt="Profile Picture" 
          className="profile-picture" 
          />
        </div>
        <h2>{user?.username}</h2>

        <div className="profile-info">
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>First Name:</strong> {user?.first_name}</p>
          <p><strong>Last Name:</strong> {user?.last_name}</p>
          <p><strong>Birthday:</strong> {new Date(user?.birthday).toLocaleDateString()}</p>
          <p><strong>Biography:</strong> {user?.biography}</p>
          <p><strong>Favorite Number:</strong> {user?.favorite_number}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
