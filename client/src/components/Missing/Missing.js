import React, { useEffect, useState } from 'react';
import MissingPost from '../MissingPost/MissingPost';
import Axios from 'axios';
import './Missing.css'
const Missing = () => {

    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [contact, setContact] = useState('')
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('')

    const [missingPosts, setMissingPosts] = useState([]);

    const showAll = () => {

        Axios.get('http://localhost:3001/missingPosts').then((res) => {
            setMissingPosts(res.data)
        })
        document.getElementById('show-all-button').style.display = 'none';
    }

    // creating fakeData
    // const sampleMissingPosts = [
    //     { id: 1, name: 'Md. Nuray Alam Siddik', Age: 22, BGroup: 'O Positive', Gender: 'Male', Description: '1/1 Circular Road, Kalabagan Dhaka -1205', Contact: '017959551153' },
    //     { id: 2, name: 'Payel Miah', Age: 25, BGroup: 'A Positive', Gender: 'Male', Description: 'Gabtola Road,Maghbazar, Dhaka', Contact: '017959551153' },
    //     { id: 3, name: 'Md. Rajib Hossain', Age: 27, BGroup: 'B Positive', Gender: 'Male', Description: 'Motejheel, Khilkhet, Dhaka -1205', Contact: '017959551153' },
    //     { id: 4, name: 'Azmira Sumsee Sristy', Age: 22, BGroup: 'O Negative', Description: 'shutrapur, Dhaka-1005', Contact: '017959551153' },

    // ];
    // if (localStorage.getItem('missingPosts')) {

    // }
    // else {
    //     const missingPosts = JSON.stringify(sampleMissingPosts);
    //     localStorage.setItem("missingPosts", missingPosts);
    // }

    // const [savedMissingPosts, setSavedMissingPosts] = useState([]);
    // useEffect(() => {
    //     const textFileOfMissingPosts = localStorage.getItem("missingPosts");

    //     const newSavedMissingPosts = JSON.parse(textFileOfMissingPosts);
    //     setSavedMissingPosts(newSavedMissingPosts);
    // }, []);

    const handleCreateButton = () => {
        document.getElementsByClassName('new-missing-post-button')[0].style.display = 'none';
        document.getElementsByClassName('new-post-form')[0].style.display = 'block';
    }

    const handleSubmitButton = () => {
        document.getElementsByClassName('new-missing-post-button')[0].style.display = 'block';
        document.getElementsByClassName('new-post-form')[0].style.display = 'none';
        Axios.post('http://localhost:3001/createMissingPost', {
            name: name,
            age: age,
            gender: gender,
            bloodGroup: bloodGroup,
            contact: contact,
            description: description,
            address: address
        }).then(() => {
            setMissingPosts([...missingPosts, {
                name: name,
                age: age,
                gender: gender,
                bloodGroup: bloodGroup,
                contact: contact,
                description: description,
                address: address
            }])
        })
    }

    // Delete Post

    const deletePost = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`).then(response => {
            setMissingPosts(missingPosts.filter(post => {
                return post.id !== id;
            }))
        })
    }
    return (
        <div>
            <div className="new-missing-post-button">
                <button onClick={() => handleCreateButton()}>Create New Missing Post</button>
            </div>
            <div className="new-post-form">
                <p>Missing Person Name: <input type="text" onChange={(event) => setName(event.target.value)} /></p>
                <p>Age: <input type="Number" onChange={(event) => setAge(event.target.value)} min='0' /></p>
                <p>Gender <input type="text" onChange={(event) => setGender(event.target.value)} /></p>
                <p> Blood Group: <input type="text" onChange={(event) => setBloodGroup(event.target.value)} /></p>
                <p>Description: <input type="text" onChange={(event) => setDescription(event.target.value)} /></p>
                <p>Contact: <input type="text" onChange={(event) => setContact(event.target.value)} /></p>
                <p>Address: <input type="text" onChange={(event) => setAddress(event.target.value)} /></p>
                <button onClick={() => handleSubmitButton()} id='submit-button'>Submit</button>
            </div>
            <div id='show-all-button'>
                <button onClick={() => showAll()} id='show-all-button'>Show All</button>
            </div>
            <div className="missing-post-section">
                {
                    missingPosts.map(post => <MissingPost key={post.id} deletePost={deletePost} post={post}></MissingPost>)
                }
            </div>
        </div>
    );
};

export default Missing;