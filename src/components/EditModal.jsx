import React from 'react';
import './EditModal.css';
import { CircleAlert, TriangleAlert } from 'lucide-react';

const EditModal = ({ error, loading, field, value, onClose, onSave, onChange }) => {
    const renderInput = () => {
    if (field === 'profile_picture') {
      return (
      <input
          type="file"
          accept="image/*"
          onChange={onChange}
      />
      );
    } else if (field === 'favorite_number') {
      return (
      <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
      />
      );
    } else if (field === 'birthday') {
      return (
      <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
      />
      );
    } else if (field === 'password') {
      return (
        <input
          type="password"
          minLength={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    } else {
      return (
      <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
      />
      );
    }
    };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <form className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Edit {field.replace('_', ' ')}</h3>
        <div className="modal-input">{renderInput()}</div>
        {(field === "username" || field === "password") &&
          <small className="modal-auth-warning">
            <TriangleAlert/> Changing your {field} will sign you out.
          </small>
        }

        {field === "profile_picture" &&
        <small className="modal-image-warning">
          <CircleAlert color="orange"/> Only JPG or JPEG files are allowed for profile pictures.
        </small>
        }

        {error && (
          <div className="error-message">{error}</div>
        )}
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose}>Cancel</button>
          <button className="modal-save" onClick={onSave} disabled={loading}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
