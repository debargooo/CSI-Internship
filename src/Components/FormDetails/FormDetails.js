import React from "react";
import style from "./FormDetails.module.css";

function FormDetails({ formValues }) {
  return (
    <div className="FormDetails">
      <h1>Form Details</h1>
      <div className={style.div}>
        <h2 className={style.h2}>First Name:</h2>
        <p  className={style.p}>{formValues.firstname}</p>
      </div>
      <div className={style.div}>
        <h2 className={style.h2}>Last Name:</h2>
        <p  className={style.h2}>{formValues.lastname}</p>
      </div>
      <div className={style.div}>
        <h2 className={style.h2}>Username:</h2>
        <p  className={style.h2}>{formValues.username}</p>
      </div>
      <div className={style.div}>
        <h2 className={style.h2}>Email:</h2>
        <p  className={style.h2}>{formValues.email}</p>
      </div>
      <div className={style.div}>
        <h2 className={style.h2}>Password:</h2>
        <p  className={style.h2}>{formValues.password}</p>
      </div>
      <div className={style.div}>
        <h2 className={style.h2}>Phone Number:</h2>
        <p  className={style.h2}>{formValues.countrycode}-{formValues.number}</p>
      </div>
      <div className={style.div}>
        <h2 className={style.h2}>Country:</h2>
        <p  className={style.h2}>{formValues.country}</p>
      </div>
      <div className={style.div}>
        <h2 className={style.h2}>City:</h2>
        <p  className={style.h2}>{formValues.city}</p>
      </div>
      <div className={style.div}>
        <h2 className={style.h2}>Adhar Number:</h2>
        <p  className={style.h2}>{formValues.adhar}</p>
      </div>
      <div className={style.div}>
        <h2 className={style.h2}>Pan Number:</h2>
        <p  className={style.h2}>{formValues.pan}</p>
      </div>
    </div>
  );
}

export default FormDetails;
