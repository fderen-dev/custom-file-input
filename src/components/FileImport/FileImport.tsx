import React, { useState } from 'react';
import FileItem from './FileItem';

import './FileImport.scss';

const _items = [
  {
    id: 'f1',
    name: 'textFile.txt',
    size: 0.2,
  },
  {
    id: 'f2',
    name: 'photo.jpg',
    size: 0.99,
  },
  {
    id: 'f3',
    name: 'logo.png',
    size: 1.2,
  },
  {
    id: 'f4',
    name: 'contract.pdf',
    size: 0.3,
  },
];

function handleSend(files: Array<any>): void {
  alert(JSON.stringify(files, null, 2));
}

function handleImport(): void {
  alert('import!');
}

const FileImport: React.FunctionComponent = () => {
  const [files, setFiles] = useState(_items);

  const handleFileDelete = (fileId: string): void => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
  };

  return (
    <div className="file-import" style={{ width: '400px', height: '100px' }}>
      <ul className="imports-list">
        {files.map(file => (
          <FileItem
            name={file.name}
            size={file.size}
            key={file.name}
            className="import-item"
            onDelete={() => handleFileDelete(file.id)}
          />
        ))}
      </ul>
      <div className="buttons-container">
        <button onClick={handleImport}>import</button>
        <button onClick={() => handleSend(files)}>send</button>
      </div>
    </div>
  );
};

export default FileImport;
