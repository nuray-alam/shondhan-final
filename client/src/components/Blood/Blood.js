import React, { useState } from 'react';
import Axios from 'axios';
import Donar from '../Donar/Donar';
import './Blood.css'

const Blood = () => {

    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [contact, setContact] = useState('')
    const [address, setAddress] = useState('');
    const [donation_status, setDonation_status] = useState('Ready for donation');

    const [donors, setDonors] = useState([]);
    const [newStatus, setNewStatus] = useState('');

   
    const showAll = () => {
        Axios.get('http://localhost:3001/donors').then((res) => {
            setDonors(res.data)
        })
        document.getElementById('show-all-button').style.display = 'none';
    }


    const handleCreateButton = () => {
        document.getElementsByClassName('new-donar-button')[0].style.display = 'none';
        document.getElementsByClassName('donar-form')[0].style.display = 'block';
    }
    const handleSubmitButton = () => {

        document.getElementsByClassName('new-donar-button')[0].style.display = 'block';
        document.getElementsByClassName('donar-form')[0].style.display = 'none';

        Axios.post('http://localhost:3001/createDonor', {
            name: name,
            age: age,
            gender: gender,
            bloodGroup: bloodGroup,
            donation_status: donation_status,
            contact: contact,
            address: address
        }).then(() => {
            setDonors([...donors, {
                name: name,
                age: age,
                gender: gender,
                bloodGroup: bloodGroup,
                donation_status: donation_status,
                contact: contact,
                address: address
            }])
        })


    }
    /// Updating the status
    const updateStatus = (new_Status, id) => {
        setNewStatus(new_Status);
        console.log("ID:", id, "new_status:", new_Status);
        Axios.put('http://localhost:3001/update', {
            donation_status: new_Status,
            id: id
        }).then(response => {
            setDonors(donors.map(donor => {
                return donor.id === id ? { id: donor.id, name: donor.name, age: donor.age, gender: donor.gender, bloodGroup: donor.bloodGroup, donation_status: new_Status, contact: donor.contact, address: donor.address } : donor
            }))
        })

    }

    return (
        <div>
            <div className="new-donar-button">
                <button onClick={() => handleCreateButton()}>Create New Donor</button>
            </div>
            <div className="donar-form">
                <p>Name: <input type="text" onChange={(event) => setName(event.target.value)} /></p>
                <p>Age: <input type="Number" onChange={(event) => setAge(event.target.value)} min='0' /></p>
                <p>Gender <input type="text" onChange={(event) => setGender(event.target.value)} /></p>
                <p> Blood Group: <input type="text" onChange={(event) => setBloodGroup(event.target.value)} /></p>
                <p> Donation Status: <input type="text" placeholder="example: Ready for donation / Not ready for donation" onChange={(event) => setDonation_status(event.target.value)} /></p>
                <p>Contact: <input type="text" onChange={(event) => setContact(event.target.value)} /></p>
                <p>Address: <input type="text" onChange={(event) => setAddress(event.target.value)} /></p>

                <button onClick={() => handleSubmitButton()} id='submit-button'>Submit</button>
            </div>
            <div id='show-all-button'>
                <button onClick={() => showAll()} id='show-all-button'>Show All</button>
            </div>
            <div className="donar-section">
                {
                    donors.map(donar => <Donar key={donar.id} updateStatus={updateStatus} donar={donar}></Donar>)
                }
            </div>


        </div>
    );
};

export default Blood;