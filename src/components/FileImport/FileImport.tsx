import React, { useState, useRef } from 'react';
import { v4 as uid } from 'uuid';

import FileItem from './FileItem';

import './FileImport.scss';

function getSize(number: number): { amount: string; unit: string } {
  if (number < 1024) {
    return { amount: number.toString(), unit: 'b' };
  } else if (number >= 1024 && number < 1048576) {
    return { amount: (number / 1024).toFixed(1), unit: 'KB' };
  } else if (number >= 1048576) {
    return { amount: (number / 1048576).toFixed(1), unit: 'MB' };
  }
  return { amount: '0', unit: 'b' };
}

interface FileExtended extends File {
  id: string;
}

function handleSend(files: Array<FileExtended>): void {
  alert(JSON.stringify(files, null, 2));
}

interface FileImportProps {
  multiple?: boolean;
  acceptedFiles?: string;
}

const FileImport: React.FunctionComponent<FileImportProps> = props => {
  const [files, setFiles] = useState<Array<FileExtended>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileDelete = (fileId: string): void => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
  };

  const handleImport = (): void => {
    if (fileInputRef.current !== null) {
      fileInputRef.current.click();
    }
  };

  const handleNewFiles = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newFiles: FileList | null = event.target.files;
    if (newFiles && newFiles.length > 0) {
      const currFiles = [...files];
      for (let ite = 0; ite < newFiles.length; ite++) {
        currFiles.push(Object.assign(newFiles.item(ite), { id: uid() }));
      }
      setFiles(currFiles);

      // clear input value after storing files
      if (fileInputRef.current !== null) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="file-import">
      <input
        type="file"
        multiple={props.multiple}
        accept={props.acceptedFiles}
        onChange={handleNewFiles}
        ref={fileInputRef}
        className="file-input"
      />
      <ul className="imports-list">
        {files.map(file => (
          <FileItem
            name={file.name}
            size={getSize(file.size)}
            key={file.id}
            onDelete={() => handleFileDelete(file.id)}
            className="import-item"
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
