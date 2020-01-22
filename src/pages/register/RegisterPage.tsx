import React from 'react';

import useForm, { min, req, max, UseFormConfig } from 'libs/forms';

import classes from './RegisterPage.scss';

const formConfig: UseFormConfig = {
  username: { value: '' },
  email: { value: '', validators: [req, min(2), max(5)] }
};

const RegisterPage = () => {
  const [fields, handleChange, handleSubmit] = useForm(formConfig);

  return (
    <div className={classes.registerPage}>
      <form onSubmit={handleSubmit}>
        <input data-field-key="email" value={fields.email.value} onChange={handleChange} />
        {fields.email.errors.map((error, idx) => (
          <p key={idx} style={{ color: error.valid ? 'green' : 'red' }}>
            {error.text}
          </p>
        ))}

        {fields.email.valid || <span>Fields invalid</span>}

        <input data-field-key="username" value={fields.username.value} onChange={handleChange} />
        {fields.username.errors.map((error, idx) => (
          <p key={idx} style={{ color: error.valid ? 'green' : 'red' }}>
            {error.text}
          </p>
        ))}
      </form>
    </div>
  );
};

export default RegisterPage;
