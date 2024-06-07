import React, { useState, useEffect } from "react";
import "./Form.css";
import FormDetails from "../FormDetails/FormDetails";

function Form() {
  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    countrycode: "",
    number: "",
    adhar: "",
    pan: "",
    country:"",
    city:""
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const formatAadhaar = (value) => {
    value = value.replace(/\D/g, "");

    if (value.length > 4) value = value.slice(0, 4) + '-' + value.slice(4);
    if (value.length > 9) value = value.slice(0, 9) + '-' + value.slice(9);

    return value;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "adhar") {
      if (value.replace(/\D/g, "").length > 12) {
        return;
      }
      formattedValue = formatAadhaar(value);
    }

    setFormValues({ ...formValues, [name]: formattedValue });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);
    if (Object.keys(errors).length === 0) {
      setSubmitMessage("Successful!");
      setIsSuccessful(true);
    } else {
      setSubmitMessage("Unsuccessful!");
      setIsSuccessful(false);
    }
    setTimeout(() => setSubmitMessage(""), 4000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const regex2 = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g;
    const regex3 = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;

    if (!values.firstname) {
      errors.firstname = "First Name required!";
    }
    if (!values.lastname) {
      errors.lastname = "Last Name required!";
    }
    if (!values.username) {
      errors.username = "Username required!";
    }
    if (!values.email) {
      errors.email = "Email required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password required!";
    } else if (!regex2.test(values.password)) {
      errors.password = "Password must contain minimum 8 characters, at least [a-z] or [A-Z] letter, [0-9] and one [#?!@$%^&*-]";
    }
    if (!values.number) {
      errors.number = "Phone Number required!";
    } else if (values.number.length !== 10) {
      errors.number = "Enter valid Phone Number!";
    }
    if (!values.adhar) {
      errors.adhar = "Adhar Number required!";
    } else if (values.adhar.replace(/-/g, "").length !== 12) {
      errors.adhar = "Enter valid Adhar Number!";
    }
    if (!values.pan) {
      errors.pan = "Pan Number required!";
    } else if (values.pan.length !== 10 || !regex3.test(values.pan)) {
      errors.pan = "Enter valid Pan Number!";
    }
    if (!values.country) {
      errors.country = "Country name required!";
    } 
    if (!values.city) {
      errors.city = "City name required!";
    } 

    return errors;
  };

  return (
    <div className="container">
      <div className="Form-Box">
      {!isSuccessful && <h1>Login Form</h1>}
        {!isSuccessful ? (
          <form onSubmit={handleSubmit}>
            <div id="name" className="form one">
              <div>
                <h2>First Name</h2>
                <p className="errorMsg">{formErrors.firstname}</p>
                <input
                  id="firstname"
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={formValues.firstname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <h2>Last Name</h2>
                <p className="errorMsg">{formErrors.lastname}</p>
                <input
                  id="lastname"
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={formValues.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form two">
              <h2>Username</h2>
              <p className="errorMsg">{formErrors.username}</p>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                value={formValues.username}
                onChange={handleChange}
              />
            </div>
            <div className="form three">
              <div>
                <h2>Email</h2>
                <p className="errorMsg">{formErrors.email}</p>
                <input
                  id="email"
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
              <div className="pass">
                <div>
                  <h2>Password</h2>
                  <p className="errorMsg">{formErrors.password}</p>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formValues.password}
                    onChange={handleChange}
                  />
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                  ) : (
                    <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5zm-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z" />
                  )}
                </svg>
              </div>
            </div>
            <div className="form four">
              <h2>Phone No.</h2>
              <p className="errorMsg">{formErrors.number}</p>
              <div className="phoneNumber">
                <select id="countrycode" type="number" name="countrycode" value={formValues.countrycode} onChange={handleChange}>
                  <option value="91">91</option>
                  <option value="92">92</option>
                  <option value="1">1</option>
                  <option value="33">33</option>
                </select>

                <input
                  id="number"
                  type="number"
                  name="number"
                  placeholder="Phone Number"
                  value={formValues.number}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form five">
              <div>
                <h2>Country</h2>
                <p className="errorMsg">{formErrors.country}</p>
                <select name="country" id="country" value={formValues.country} onChange={handleChange}>
                <option value="Country">Select Country</option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Usa">USA</option>
                  <option value="France">France</option>
                </select>
              </div>
              <div>
                <h2>City</h2>
                <p className="errorMsg">{formErrors.city}</p>
                <select name="city" id="city" value={formValues.city} onChange={handleChange}>
                <option value="City">Select City</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bihar">Bihar</option>
                </select>
              </div>
            </div>
            <div className="form six">
              <div>
                <h2>Adhar Number</h2>
                <p className="errorMsg">{formErrors.adhar}</p>
                <input
                  id="adhar"
                  type="text"
                  name="adhar"
                  placeholder="Adhar Number"
                  value={formValues.adhar}
                  onChange={handleChange}
                ></input>
              </div>
              <div>
                <h2>Pan Number</h2>
                <p className="errorMsg">{formErrors.pan}</p>
                <input
                  id="pan"
                  type="text"
                  name="pan"
                  placeholder="Pan Number"
                  value={formValues.pan}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <input id="submit" type="submit"></input>
          </form>
        ) : (
          <FormDetails formValues={formValues} />
        )}
        {submitMessage && (
          <div className={`submitMessage ${submitMessage === "Successful!" ? "success" : "error"}`}>
            {submitMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;
