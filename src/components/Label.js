import React from 'react';
import PropTypes from 'prop-types';

export const Label = ({ children, ...rest }) => (
  <label className="label" {...rest}>
    {children}
  </label>
);

Label.propTypes = {
  children: PropTypes.node.isRequired
};
