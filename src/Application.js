import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import yaml from 'js-yaml';
import RenderProps from './RenderProps';
import PopupComponent from './PopupComponent';
import { fetchAnsibleDoc } from './utils';

const Application = () => {
  const [playbook, setPlaybook] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [moduleInfo, setModuleInfo] = useState(null);

  // Debug lines
  console.log("Type of playbook:", typeof playbook); // To debug the RenderProps issue
  console.log("showPopup value:", showPopup); // To debug the PopupComponent issue

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      try {
        const obj = yaml.load(event.target.result);
        setPlaybook(obj);
      } catch (err) {
        console.error('Invalid YAML file:', err);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div style={{ backgroundColor: '#F1FAEE' }}>
      <input type="file" accept=".yml,.yaml" onChange={handleFile} />
      <div style={{ border: '2px solid #FF79C6', padding: '15px', margin: '20px', backgroundColor: '#6272A4' }}>
        {playbook && (
          <>
            <h4 style={{ color: '#50FA7B' }}>Playbook Content:</h4>
            <div
              style={{
                border: '1px solid #8BE9FD',
                padding: '10px',
                margin: '20px',
                backgroundColor: '#44475A',
              }}
            >
              <RenderProps obj={playbook} fetchAnsibleDoc={fetchAnsibleDoc} setShowPopup={setShowPopup} setModuleInfo={setModuleInfo} />
            </div>
          </>
        )}
      </div>
      {showPopup && (
        <Popup open={showPopup} onClose={() => setShowPopup(false)}>
          <PopupComponent moduleInfo={moduleInfo} />
      </Popup>
)} 
    </div>
  );
};

export default Application;
