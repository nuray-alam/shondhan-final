import React from 'react';
import './MissingPost.css'
const MissingPost = ({ post, deletePost}) => {

    const {id, name, age, gender, bloodGroup, contact, description, address } = post;
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
        <div className='missing-post'>
            <img src={imgUrl} alt="" />
            <h4>Missing Person Name: {name}</h4>
            <h5>Age: {age}</h5>
            <h5>Gender: {gender}</h5>
            <h5>Blood Group: {bloodGroup}</h5>
            <h1>Contact: {contact}</h1>
            <h5>Description: {description}</h5>
            <h5>Address: {address}</h5>

            <button id='delete-button' onClick={() => deletePost(id)}>Delete The Post</button>
        </div>
    );
};

export default MissingPost;