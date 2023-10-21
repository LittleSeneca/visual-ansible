import React from 'react';
import PropTypes from 'prop-types';

const RenderProps = ({ obj, isNested = false, fetchAnsibleDoc, setShowPopup, setModuleInfo }) => (
  <div>
    {Object.keys(obj).map((key, index) => (
      <div 
        key={index}
        style={{
          color: '#F8F8F2',
          paddingBottom: '10px',
        }}
      >
        <strong 
          onClick={async () => {
            if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
              const info = await fetchAnsibleDoc(key);
              setModuleInfo(info);
              setShowPopup(true);
            }
          }}
          style={{
            color: (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) ? '#BD93F9' : '#F8F8F2',
            cursor: (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) ? 'pointer' : 'default'
          }}
        >
          {/* Only show key text if it's not a number */}
          {isNaN(key) ? key.charAt(0).toUpperCase() + key.slice(1) + ':' : null}
        </strong>
        
        {typeof obj[key] === 'object' ? (
          <div
            style={{
              marginLeft: '20px',
              border: isNested ? '2px solid #6272A4' : 'none',
              padding: isNested ? '10px' : '0px',
              backgroundColor: '#44475A',
              boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
            }}
          >
            <RenderProps obj={obj[key]} isNested={true} fetchAnsibleDoc={fetchAnsibleDoc} setShowPopup={setShowPopup} setModuleInfo={setModuleInfo} />
          </div>
        ) : (
          <span style={{ color: '#50FA7B' }}>{obj[key]}</span>
        )}
      </div>
    ))}
  </div>
);

RenderProps.propTypes = {
  obj: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  isNested: PropTypes.bool,
  fetchAnsibleDoc: PropTypes.func.isRequired,
  setShowPopup: PropTypes.func.isRequired,
  setModuleInfo: PropTypes.func.isRequired,
};

export default RenderProps;
