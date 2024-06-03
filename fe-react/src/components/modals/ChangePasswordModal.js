import React from 'react';
import './ChangePasswordModal.css';

const ChangePasswordModal = ({ isOpen, close, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={close}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {children}
                <button className="close-button" onClick={close}>Close</button>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
