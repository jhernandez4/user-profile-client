import { useEffect, useState } from 'react';
import './UserProfile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditModal from '../../components/EditModal';
import { Image, SquarePen } from 'lucide-react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState('');
  const [file, setFile] = useState(null);
  const fieldsMap = {
    email: "Email",
    first_name: "First Name",
    last_name: "Last Name",
    biography: "Biography",
    favorite_number: "Favorite Number",
    birthday: "Birthday",
  };

  const fieldsList = Object.keys(fieldsMap);
  const navigate = useNavigate();
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
        if (error.status === 401){
          navigate("/login");
        }

        setError(error?.response?.data?.detail || 'An error occurred while logging in.');
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, [])

  const openModal = (field) => {
    setEditingField(field);
    if (field === 'profile_picture') {
      setFile(null);
    } else if (field === 'birthday') {
      const dateValue = new Date(user[field]).toISOString().split('T')[0];
      setFieldValue(dateValue);
    } else {
      setFieldValue(user[field]);
    }
  };

  const handleSave = async () => {
    try {
      const userToken = localStorage.getItem("access_token");

      const formData = new FormData();
      if (editingField === 'profile_picture') {
        formData.append("profile_picture", file);
      } else {
        formData.append(editingField, fieldValue);
      }

      await axios.patch(`${backendUrl}/users/me`, formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Refetch updated user data
      const response = await axios.get(`${backendUrl}/users/me`, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      setUser(response.data);
    } catch (error) {
      if (error.status === 401){
        navigate("/login");
      }
      setError(error?.response?.data?.detail || 'An error occurred while saving.');
      console.log(error);
    } finally {
      setEditingField(null);
    }
  };

  if (isLoading) {
    return (
      <p>Loading profile</p>
    );
  }

  if (error) {
    return (
      <p>Failed to load profile</p>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-picture-wrapper" onClick={() => openModal('profile_picture')}>
          <img src={`${backendUrl}${user?.profile_picture}`} alt="Profile Picture" className="profile-picture" />
          <div className="profile-picture-overlay">
            <Image/>
          </div>
        </div>

        <div className="username-container profile-info-field" onClick={() => openModal('username')}>
          <h2>
            {user?.username}
          </h2>
          <SquarePen className="edit-field-icon" size={18}/>
        </div>


        <ul className="profile-info">
          {fieldsList.map((field) => (
            <li 
            key={field} 
            onClick={() => openModal(field)} 
            className="profile-info-field"
            >
              <strong>{fieldsMap[field]}</strong>
              <span >
                {": "}
                {field === 'birthday'
                  ? new Date(user[field]).toLocaleDateString()
                  : user[field]}
              </span>
              <SquarePen className="edit-field-icon" size={18}/>
            </li>
          ))}
        </ul>
      </div>

      {editingField && (
        <EditModal
          field={editingField}
          value={fieldValue}
          onClose={() => setEditingField(null)}
          onSave={handleSave}
          onChange={(value) =>
            editingField === 'profile_picture'
              ? setFile(value.target.files[0])
              : setFieldValue(value)
          }
        />
      )}
    </div>
  );
};

export default UserProfile;
