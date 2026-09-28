import React from 'react';

const ClayCard = ({
  children,
  className = '',
  interactive = false,
  ...props
}) => {
  const hasPadding = /\bp-\d|\bpx-\d|\bpy-\d/.test(className);
  const paddingClass = hasPadding ? '' : 'p-6 md:p-8';

  return (
    <div
      className={`${
        interactive ? 'clay-card-interactive' : 'clay-card'
      } ${paddingClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default ClayCard;
