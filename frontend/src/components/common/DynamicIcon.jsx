import React from 'react';
import * as Icons from 'lucide-react';

const DynamicIcon = ({ name, className = 'w-6 h-6', defaultIcon = 'Code' }) => {
  const IconComponent = Icons[name] || Icons[defaultIcon] || Icons.Code;
  return <IconComponent className={className} />;
};

export default DynamicIcon;
