import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

export const Button = ({ children, ...rest }) => (
  <button className="btn" {...rest}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired
};
