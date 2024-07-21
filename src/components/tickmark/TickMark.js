import React from 'react';
import './TickMark.css'; // Import CSS for the animation

const TickMark = ({ visible }) => {
    return (
        <div className={`tickmark-container ${visible ? 'visible' : ''}`}>
            <div className="tickmark">&#10003;</div>
        </div>
    );
};

export default TickMark;
