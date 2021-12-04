/** @module */
import React from 'react';

import './Navigator.scss';

import days from 'days';
import DayDisplay from 'components/DayDisplay';

/**
 */
export const Navigator = () => (
  <div className="advent-navigator">
    {days.map(({ name, functions }) => (
      <DayDisplay {...{ name, functions }} />
    ))}
  </div>
);

Navigator.propTypes = {
};

export default Navigator;
