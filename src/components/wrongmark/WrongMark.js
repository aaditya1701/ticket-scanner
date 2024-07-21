import React from 'react';
import './WrongMark.css';

const WrongMark = ({ visible }) => {
    return visible ? (
        <div className="wrong-mark">
            <div className="cross-line cross-line1"></div>
            <div className="cross-line cross-line2"></div>
        </div>
    ) : null;
};

export default WrongMark;
