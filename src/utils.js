import yaml from 'js-yaml';

export const handleFile = (e, setPlaybook) => {
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

export const fetchAnsibleDoc = async (moduleName) => {
  const response = await fetch(`http://localhost:3001/ansible-doc/${moduleName}`);
  const data = await response.json();
  if (data.error) {
    console.error(data.error);
    return null;
  }
  return data.info;
};
