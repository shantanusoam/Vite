import React from 'react';
import './style.css';
const InputField = () => {
  return (
    <form className="input">
      <input
        type="text"
        placeholder="Enter Desired Text"
        className="input__box"
      />
      <button className="input__button" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
