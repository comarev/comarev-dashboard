import React from 'react';
import './error-check-styles.css';

function ErrorCheck() {
  return (
    <svg
      class='errormark'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 52 52'
    >
      <circle class='errormark_circle' cx='26' cy='26' r='25' fill='none' />
      <path
        class='errormark_error'
        fill='none'
        d='M14.1 14.1l23.8 23.8 m0,-23.8 l-23.8,23.8'
      />
    </svg>
  );
}

export default ErrorCheck;
