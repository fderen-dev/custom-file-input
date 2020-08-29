import React from 'react';

interface FileItemProps {
  name: string;
  size: { amount: string; unit: string };
  onDelete: () => void;
  className?: string;
}

const FileItem: React.FunctionComponent<FileItemProps> = props => (
  <li className={props.className}>
    <span>{props.name}</span>
    <span>
      <span>{props.size.amount}</span>
      <span>{props.size.unit}</span>
    </span>
    <span onClick={props.onDelete}>X</span>
  </li>
);

export default FileItem;
