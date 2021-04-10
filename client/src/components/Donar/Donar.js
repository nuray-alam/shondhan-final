import React, { useState } from 'react';
import './Donar.css'
const Donar = ({ donar, updateStatus }) => {
    const { id, name, age, gender, bloodGroup, donation_status, contact, address } = donar;
    const [newStatus , setNewStatus] = useState('')
    const maleImgUrl = `https://i.ibb.co/GV3D5qf/men-Profile.png`;
    const femaleImgUrl = `https://i.ibb.co/xSHJ8CP/female.jpg`;
    let imgUrl = '';
    if (gender === 'Male' || gender === 'male') {
        imgUrl = maleImgUrl;
    }
    else {
        imgUrl = femaleImgUrl;
    }
    return (
        <div className='donar'>
            <img src={imgUrl} alt="" />
            <h3>Name: {name}</h3>
            <h5>Age: {age}</h5>
            <h5>Gender: {gender}</h5>
            <h3><span id='blood-group'>Blood Group: {bloodGroup}</span></h3>
            <h4>Donation Status: {donation_status}</h4>
            <h4>Contact: {contact}</h4>
            <h5>Address: {address}</h5>


            <p>Write The New Status</p>
            <input type="text" onChange= {(event) => setNewStatus(event.target.value)} />

            <button onClick= {() => updateStatus(newStatus,id)}>Update Status</button>
        </div>
    );
};

export default Donar;