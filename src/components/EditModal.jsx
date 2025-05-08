import React from 'react';
import './EditModal.css';
import { TriangleAlert } from 'lucide-react';

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
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Edit {field.replace('_', ' ')}</h3>
        <div className="modal-input">{renderInput()}</div>
        {error && (
          <div className="error-message modal-error">{error}</div>
        )}
        {field == "username" &&
          <small className="modal-username-warning">
            <TriangleAlert/> Changing your username will sign you out.
          </small>
        }
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose}>Cancel</button>
          <button className="modal-save" onClick={onSave} disabled={loading}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
