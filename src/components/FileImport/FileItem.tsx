import React from 'react';

interface FileItemProps {
  name: string;
  size: number;
  className: string;
  onDelete: () => void;
}

const FileItem: React.FunctionComponent<FileItemProps> = props => (
  <li className={props.className}>
    <span>{props.name}</span>
    <span>
      <span>{props.size}</span>
      <span>MB</span>
    </span>
    <span onClick={props.onDelete}>X</span>
  </li>
);

export default FileItem;
