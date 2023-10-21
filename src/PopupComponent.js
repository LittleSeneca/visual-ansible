import React from 'react';
import PropTypes from 'prop-types';

const PopupComponent = ({ moduleInfo }) => (
  <div style={{
    backgroundColor: '#282A36', // Dracula Background
    color: '#F1FAEE', // Text color
    border: '2px solid #50FA7B', // Green border
    borderRadius: '10px',
    width: '75%', // Set width
    margin: 'auto',
    position: 'relative',
  }}>
    <span 
      style={{
        position: 'absolute',
        top: '10px',
        right: '15px',
        cursor: 'pointer',
        color: '#F1FAEE', // Text color
      }}
      // onClick is no longer needed here; it's managed by App.js
    >
      X
    </span>
    <div style={{ padding: '20px', maxHeight: '600px', overflow: 'auto' }}>
      <pre>{moduleInfo}</pre>
    </div>
  </div>
);

PopupComponent.propTypes = {
  moduleInfo: PropTypes.string,
};

export default PopupComponent;
