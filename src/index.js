import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import yaml from 'js-yaml';

const RenderProps = ({ obj, isNested, skipTop = false }) => (
  <div>
    {(skipTop && Array.isArray(obj) && obj.length > 0 ? Object.keys(obj[0]) : Array.isArray(obj) ? obj : Object.keys(obj)).map((key, index) => (
      <div key={index} style={{ color: '#F8F8F2' /* Dracula Foreground */ }}>
        <strong>
          {typeof obj === 'object' && !Array.isArray(obj) && !skipTop
            ? key.charAt(0).toUpperCase() + key.slice(1) + ':'
            : ''}
        </strong>
        {typeof (Array.isArray(obj) ? obj[index] : obj[key]) === 'object' ? (
          <div
            style={{
              marginLeft: '20px',
              border: isNested ? '2px solid #6272A4' : 'none', // Dracula Comment
              padding: isNested ? '10px' : '0px',
              backgroundColor: '#44475A', // Dracula Selection
            }}
          >
            <RenderProps obj={Array.isArray(obj) ? obj[index] : obj[key]} isNested={true} />
          </div>
        ) : (
          <span style={{ color: '#50FA7B' }}>{Array.isArray(obj) ? obj[index] : obj[key]}</span> // Dracula Green
        )}
      </div>
    ))}
  </div>
);

const App = () => {
  const [playbook, setPlaybook] = useState({ tasks: [], handlers: [] });

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

  const renderPlaybookContent = () => {
    if (!playbook) {
      return <div>No playbook loaded</div>;
    }
  
    return (
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
          <RenderProps obj={playbook} skipTop={true} />
        </div>
      </>
    );
  };   

  return (
    <div style={{ backgroundColor: '#F1FAEE' }}>
      <input type="file" accept=".yml,.yaml" onChange={handleFile} />
      <div style={{ border: '2px solid #FF79C6', padding: '15px', margin: '20px', backgroundColor: '#6272A4' }}>
        {renderPlaybookContent()}
      </div>
    </div>
  );
  
}; 

const root = document.getElementById('root');
const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(<App />);
