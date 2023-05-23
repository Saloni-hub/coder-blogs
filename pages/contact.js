import React, { useState } from "react";
import styles from "../styles/Contact.module.css";

const Contact = () => {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [dec,setDec] = useState('')


  const handleSubmit = (e) => {
    console.log(name,email,phone,dec);
    e.preventDefault()
    const data = {name,email,phone,dec}

    fetch("http://localhost:3000/api/postContact", {
      method: "POST",
      body: JSON.stringify({
        data,
      }),
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => response.text())
    .then(data => {
      alert('Thanks for contacting us')
      setDec('')
      setName('')
      setEmail('')
      setPhone('')
    })
    .catch(err => {
      console.error('Error', err)
    })
  }

  const handleChange = (e) => {
    if(e.target.name === 'phone'){
      setPhone(e.target.value)
    }
    else if(e.target.name === 'name'){
      setName(e.target.value)
    }
    else if(e.target.name === 'email'){
      setEmail(e.target.value)
    }
   else if(e.target.name === 'dec'){
      setDec(e.target.value)
    }
   console.log(e.target.value);
  }
 

  return (
    <div className={styles.container}>
      <h1>Contact US </h1>
      <div>
        <form className={styles.contactform}>
          <input placeholder="Enter name" type="text" name='name' id="name" onChange={handleChange} value={name}  />
          <input placeholder="Enter email" type="email" name='email' id='email' onChange={handleChange} value={email} />
          <input placeholder="Enter mobile no." type="text" name='phone' id='phone' onChange={handleChange} value={phone} />
          <textarea placeholder="Write your concer here!" type="text" name='dec' id='dec' onChange={handleChange} value={dec} ></textarea>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
