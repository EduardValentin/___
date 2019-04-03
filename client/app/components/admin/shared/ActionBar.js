import React, { memo } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

const ActionBar = memo(({ className, title = 'No title', buttons = [] }) => {
  return (
    <div
      className={classnames('action-bar mb-3 w-100 d-flex justify-content-between align-items-center', className)}
    >
      <h3 className="text-black">{title}</h3>
      <div>
        {buttons.map(button => {
          if (button.type === 'button') {
            return (
              <div
                onClick={button.onClick}
                className={`btn btn-${button.bootstrapColor}`}
              >
                {button.text}
              </div>
            );
          }
          return (
            <Link
              to={button.link}
              className={`btn btn-${button.bootstrapColor} mr-2`}
            >
              {button.text}
            </Link>
          );
        })}
      </div>
    </div>
  );
});

export default ActionBar;