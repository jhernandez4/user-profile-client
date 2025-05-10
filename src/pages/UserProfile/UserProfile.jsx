import { useEffect, useState } from 'react';
import './UserProfile.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import EditModal from '../../components/EditModal';
import { House, Image, KeyRound, LogOut, SquarePen } from 'lucide-react';
import { Skeleton } from '@mui/material';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [fieldError, setFieldError] = useState(null);
  const [fieldLoading, setFieldLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState('');
  const [file, setFile] = useState(null);
  const fieldsMap = {
    username: "Username",
    email: "Email",
    first_name: "First Name",
    last_name: "Last Name",
    biography: "Biography",
    favorite_number: "Favorite Number",
    birthday: "Birthday",
    password: "Password"
  };

  const fieldsList = Object.keys(fieldsMap).filter(
    (field) => field !== 'username' && field !== 'password'
  );

  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getImageUrl = (imagePath) => {
    // Check if the image path starts with "/images", which means it's from the backend
    if (imagePath && imagePath.startsWith('/images')) {
      return `${backendUrl}${imagePath}`; 
    }
    return imagePath; // If it's an external URL, return it as is
  };

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
    if (isLoading) {
      return;
    }

    setFieldError(null);
    setEditingField(field);
    if (field === 'profile_picture') {
      setFile(null);
    } else if (field === 'birthday') {
      const dateValue = new Date(user[field]).toISOString().split('T')[0];
      setFieldValue(dateValue);
    } else if (field === 'password') {
      setFieldValue("");
    } else {
      setFieldValue(user[field]);
    }
  };

  const handleSave = async () => {
    try {
      setFieldError(null);
      setFieldLoading(true);
      const userToken = localStorage.getItem("access_token");

      const formData = new FormData();
      if (editingField === 'profile_picture') {
        if (!file) {
          setFieldError("Choose a file")
          return;
        }        

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

      // Changing username invalidates token automatically
      // Remove access token on username change for consistency
      if (editingField === "password" || editingField === "username") {
        localStorage.removeItem("access_token");
        navigate("/login");
      }

      setUser(response.data);
      setEditingField(null);
    } catch (error) {
      if (error.status === 401){
        navigate("/login");
      }

      const errorDetail = error?.response?.data?.detail 

      if (errorDetail[0]?.type){
        if (errorDetail[0]?.type === "string_too_short") {
          setFieldError(`${fieldsMap[editingField]} needs to be at least one character`)
        } else if (errorDetail[0]?.type === "value_error") {
          setFieldError(errorDetail[0]?.ctx.reason)
        }
      }  else {
        setFieldError(errorDetail || 'An error occurred while saving.');
      }

      console.log(error);
    } finally {
      setFieldLoading(false);
    }
  };

  if (error) {
    return (
      <p>Failed to load profile</p>
    );
  }

  const handleLogOut = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <nav className="profile-navbar">
          <Link to="/" className="profile-navbar-item" title="Home">
            <House size={36}/>
          </Link>
          <button onClick={handleLogOut} className="profile-navbar-item" title="Log out">
            <LogOut size={36}/>
          </button>
        </nav>
        <div className="profile-picture-wrapper" onClick={() => openModal('profile_picture')}>
          {isLoading ? 
          <Skeleton variant={"circular"} height={120} width={120}/> 
          : 
          <img src={getImageUrl(user?.profile_picture)} alt="Profile Picture" className="profile-picture" />
          }
          <div className="profile-picture-overlay">
            <Image/>
          </div>
        </div>

        <div className="username-container profile-info-field" onClick={() => openModal('username')}>
          {isLoading ? 
            <h2>
              <Skeleton variant="text" sx={{ fontSize: '1.7rem' }} width={180}/>
            </h2>
            :
            <h2>
              {user?.username}
              <SquarePen className="edit-field-icon" size={18}/>
            </h2>
          }
        </div>

        <ul className="profile-info">
          {fieldsList.map((field) => (
            <li 
            key={field} 
            onClick={() => openModal(field)} 
            className="profile-info-field"
            >
              {isLoading ? (
                <>
                  <Skeleton className="field-key-skeleton" variant="text" sx={{ fontSize: '1.7rem' }} width={70}/>
                  <Skeleton variant="text" sx={{ fontSize: '1.7rem' }} width={600}/>
                </>
              )
              : (
              <>
                <strong>
                  {fieldsMap[field]}
                </strong>
                
                <span>
                  {": "}
                  {field === 'birthday'
                    ? new Date(user[field]).toLocaleDateString()
                    : user[field]}
                  <SquarePen className="edit-field-icon" size={18}/>
                </span>
              </>
              )}
            </li>
          ))}
        </ul>

        <button className="profile-password" onClick={() => openModal("password")}>
          Change password <KeyRound/> 
        </button>
      </div>

      {editingField && (
        <EditModal
          error={fieldError}
          loading={fieldLoading}
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
