import React from 'react';
import { useState } from 'react';
import './signup.scss';
import Separator from '../Separator/Separator';
import poster from '../../images/mando.jpg';
import { Link, Navigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

function SignUp(prop) {
  const { t } = useTranslation();

  const [title, setTitle] = useState(prop.title);
  const [isValid, setIsValid] = useState(undefined);
  const [input, setInvalidInput] = useState('');

  const [form, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    age: 0,
    password: '',
    birthday: '',
  });

  const [isErrors, setIsErrors] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    age: '',
    birthday: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...form, [name]: value });
    setIsValid(validateField(name, value)); // Call validateField on input change
  };

  const validateField = (fieldName, value) => {
    let newErrors = { ...isErrors };

    if (fieldName === 'firstname') {
      newErrors.firstname =
        value.trim() === '' ? 'First name cannot be empty' : '';
      if (newErrors.firstname) {
        setInvalidInput('firstname');
      }
    }

    if (fieldName === 'lastname') {
      newErrors.lastname =
        value.trim() === '' ? 'Last name cannot be empty' : '';
      if (newErrors.lastname) {
        setInvalidInput('lastname');
      }
    }

    if (fieldName === 'email') {
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      const hasValidEmail = emailRegex.test(value);
      newErrors.email = !hasValidEmail ? 'Please enter a valid email' : '';
      if (newErrors.email) {
        setInvalidInput('email');
      }
    }

    if (fieldName === 'password') {
      let password = value;
      newErrors.password =
        password.length < 8 || password.length > 30
          ? 'Password must be between 8 and 30 characters'
          : '';
      if (newErrors.password) {
        setInvalidInput('password');
      }
    }

    if (fieldName === 'age') {
      let age = value;
      newErrors.age =
        age < 18 || age > 100 ? 'Age must be between 18 and 100' : '';
      if (newErrors.age) {
        setInvalidInput('age');
      }
    }

    if (fieldName === "birthday") {
      const birthdayDate = new Date(value);
      const currentDate = new Date();
      newErrors.birthday = birthdayDate.getTime() > currentDate.getTime() ? t("Birthday cannot be in the future") : "";
      if (newErrors.birthday) {
          setInvalidInput("birthday");
      }
  }


    setIsErrors(newErrors);

    const allValid = Object.values(newErrors).every(error => error === '');
    if (allValid) {
      setInvalidInput(''); // Reset the invalid input if all fields are valid
    }
    return allValid;
  };

  const validateForm = () => {
    let isValidForm = true;
    for(let key in form) {
      isValidForm = isValidForm && validateField(key, form[key]);
    }
    return isValidForm;
  };

  const onSubmitForm = async e => {
    e.preventDefault();
    if (!validateForm()) {
      setIsErrors(true);
      return;
    }
    try {
      const body = {
        firstname: form.firstname,
        middlename: form.middlename,
        lastname: form.lastname,
        email: form.email,
        age: form.age,
        password: form.password,
        birthday: form.birthday,
      };

      const url = window.location.href;
      if (isValid === true) {
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(body),
        })
          .then(res => res.json())
          .then(data => {
            if (data.error === false) {
              setIsErrors(false);
              window.location = `/${prop.title}/signin`;
            } else {
              setIsErrors(true);
            }
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="sign-up-container">
      <Separator status="1"></Separator>
      <div className="pseudo-form-container">
        <div className="sign-up-form-container">
          <span>
            {t('Create New')} {title} {t('Account')}
          </span>
            <form className="form-input-container" onSubmit={onSubmitForm}>
              <div className="section">
                <input
                  className={`opacity ${isErrors.email && 'error'}`}
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder={
                    isErrors.email ||
                    t('Your Email (An activation link will be sent)')
                  }
                  required
                  autoComplete="on"
                ></input>
                {isErrors.email && (
                  <label className="label isError" id="email">
                    {isErrors.email}
                  </label>
                )}
              </div>

              <div className="section">
                <input
                  className={`opacity ${isErrors.password && 'error'}`}
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder={isErrors.password || t('Your Password')}
                ></input>
                {isErrors.password && (
                  <label className="label isError" id="password">
                    {isErrors.password}
                  </label>
                )}
              </div>

              <div className="section">
                <input
                  className={`opacity ${isErrors.firstname && 'error'}`}
                  type="text"
                  name="firstname"
                  value={form.firstname}
                  onChange={handleChange}
                  placeholder={isErrors.firstname || t('First Name')}
                ></input>
                {isErrors.firstname && (
                  <label className="label isError" id="firstname">
                    {isErrors.firstname}
                  </label>
                )}
              </div>

              <div className="section">
                <input
                  className={`opacity ${isErrors.middlename && 'error'}`}
                  type="text"
                  name="middlename"
                  value={form.middlename}
                  onChange={handleChange}
                  placeholder={t('Middle Name (Optional)')}
                ></input>
              </div>

              <div className="section">
                <input
                  className={`opacity ${isErrors.lastname && 'error'}`}
                  type="text"
                  name="lastname"
                  value={form.lastname}
                  onChange={handleChange}
                  placeholder={isErrors.lastname || t('Last Name')}
                ></input>
                {isErrors.lastname && (
                  <label className="label isError" id="lastname">
                    {isErrors.lastname}
                  </label>
                )}
              </div>

              <div className="section">
                <input
                  className={`opacity ${isErrors.age && 'error'}`}
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder={isErrors.age || t('Your Age')}
                ></input>
                {isErrors.age && (
                  <label className="label isError" id="age">
                    {isErrors.age}
                  </label>
                )}
              </div>

              <div className="section">
                <input
                  className={`opacity ${isErrors.birthday && 'error'}`}
                  type="date"
                  name="birthday"
                  value={form.birthday}
                  onChange={handleChange}
                  placeholder={isErrors.birthday || t('Your Birthday')}
                ></input>
                {isErrors.birthday && (
                  <label className="label isError" id="birthday">
                    {isErrors.birthday}
                  </label>
                )}
              </div>

              <button type="submit" disabled={!isValid}>
                {t('Submit')}
              </button>
            </form>
          <Link to={{ pathname: `/${prop.title}/signin` }} className="back">
            {t('Back to Sign In')}
          </Link>
        </div>
        <div className="poster">
          <img src={poster} alt=""></img>
        </div>
      </div>
      <Separator></Separator>
    </div>
  );
}

export default SignUp;
