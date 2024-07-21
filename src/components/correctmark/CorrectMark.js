import React from 'react';
import './CorrectMark.css';

const CorrectMark = ({ visible }) => {
    return (
        <div className={`correct-mark ${visible ? 'visible' : ''}`}>
            <div className="checkmark">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="25" fill="none" />
                    <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
            </div>
        </div>
    );
};

export default CorrectMark;
