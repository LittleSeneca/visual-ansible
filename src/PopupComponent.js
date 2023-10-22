import React from 'react';
import PropTypes from 'prop-types';
import './PopupComponent.css';
import './Card.css';

const PopupComponent = ({ moduleInfo }) => (
  <div className="popup-container">
    <span className="close-button">
      X
    </span>
    <div className="content">
      <pre>{moduleInfo}</pre>
    </div>
  </div>
);

PopupComponent.propTypes = {
  moduleInfo: PropTypes.string,
};

export default PopupComponent;
