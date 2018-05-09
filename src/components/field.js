import React, { Component } from 'react';
export const inputField = ({readOnly,input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} readOnly={readOnly}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)