import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import './RenderProps.css';

const isAnsibleModule = (obj, key) => {
  return obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key]) && !obj[key].tasks;
};

const RenderProps = ({ obj, isNested = false, fetchAnsibleDoc, setShowPopup, setModuleInfo, isTaskChild = false, level = 0 }) => (
  <div>
    {Object.keys(obj).map((key, index) => (
      <div 
        key={index} 
        className={
          isTaskChild ? "custom-task-class key-text" : "key-text"
        }
      >
        <strong 
          onClick={async () => {
            if (isAnsibleModule(obj, key)) {
              const info = await fetchAnsibleDoc(key);
              setModuleInfo(info);
              setShowPopup(true);
            }
          }}
          className={
            isAnsibleModule(obj, key) ? 'ansible-module' : 'key-default'
          }
        >
          {isNaN(key) ? key.charAt(0).toUpperCase() + key.slice(1) + ':' : null}
        </strong>
        
        {typeof obj[key] === 'object' ? (
          <div className={level > 0 ? 'card' : ''}>
            <RenderProps 
              obj={obj[key]} 
              isNested={true} 
              fetchAnsibleDoc={fetchAnsibleDoc} 
              setShowPopup={setShowPopup} 
              setModuleInfo={setModuleInfo} 
              isTaskChild={key === "tasks"}
              level={level + 1}
            />
          </div>
        ) : (
          <span className="value-text">{obj[key]}</span>
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
  isTaskChild: PropTypes.bool,
  level: PropTypes.number,
};

export default RenderProps;
