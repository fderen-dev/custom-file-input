import React, { useState, useRef, useEffect } from 'react';
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

function computeFilesSize(files: Array<FileExtended>): number {
  return files.reduce((acc: number, item: FileExtended): number => acc + item.size, 0);
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
  maxFilesMBSize?: number;
  maxFilesAmount?: number;
}

const FileImport: React.FunctionComponent<FileImportProps> = ({ maxFilesMBSize, maxFilesAmount, ...props }) => {
  const [files, setFiles] = useState<Array<FileExtended>>([]);
  const [error, setError] = useState<string | undefined>();
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

  useEffect(() => {
    if (maxFilesMBSize && computeFilesSize(files) / 1048576 > maxFilesMBSize) setError('Max files size exceeded.');
    else if (maxFilesAmount && files.length > maxFilesAmount) setError('Max files amount exceeded.');
    else setError(undefined);
  }, [files, maxFilesMBSize, maxFilesAmount]);

  return (
    <>
      <input
        type="file"
        multiple={props.multiple}
        accept={props.acceptedFiles}
        onChange={handleNewFiles}
        ref={fileInputRef}
        className="file-input"
      />
      <div className="content-wrapper">
        <div className="description">
          {maxFilesAmount && <div>Max files amount: {maxFilesAmount}</div>}
          {maxFilesMBSize && <div>Max files size: {maxFilesMBSize} MB</div>}
        </div>
        <div className="file-import">
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
        {error && <span className="error">{error}</span>}
      </div>
    </>
  );
};

export default FileImport;
