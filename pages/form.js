import { useState } from "react"
import axios from 'axios';

export default function Form(){
    var [name, setName] = useState();
    var [phoneNumber, setPhoneNumber] = useState('');
    var [email, setEmail] = useState();
    var [addresses, setAddresses] = useState(['']);

    function submit(event) {
        event.preventDefault();
        if (!name || !phoneNumber || !email || !addresses || addresses.some(address => !address)){
            alert('Please fill all the fields correctly before submitting.');
        }
        else {
            axios.post('http://localhost:3000/api/form', {
                name: name,
                phoneNumber: phoneNumber,
                email: email,
                address: addresses
            }).then((res) => {
                console.log(res.data)
                if (res.data.status === "ok"){
                    window.location.href = "http://localhost:3000/"
                }
            });
        }

        console.log("Name:", name);
        console.log("Phone Number:", phoneNumber);
        console.log("Email:", email);
        console.log("Address:", addresses);
    }

    function handleAddressChange(index, event) {
        const newAddresses = [...addresses];
        newAddresses[index] = event.target.value;
        setAddresses(newAddresses);
    }

    return (
        <div className="form">
            {name && name.length > 50 && <p>Please do not insert more than 50 characters in your name field.</p>}
            {phoneNumber && (phoneNumber.length < 10 || !/^[0-9]+$/.test(phoneNumber)) && <p>Please insert a valid phone number.</p>}
            {email && !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email) && <p>Please enter a valid email address.</p>}

            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    required
                />
            </label>
            <label>
                Phone Number:
                <input
                    type="number"
                    value={phoneNumber}
                    pattern="[0-9]*"
                    onChange={(event) => setPhoneNumber(event.target.value.replace(/[^\d]/g, ''))}
                    required
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    pattern= "/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/"
                    onChange={event => setEmail(event.target.value)}
                    required
                />
            </label>

            <label>
                Address:
                {addresses.map((address, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={address}
                            onChange={(event) => handleAddressChange(index, event)}
                            required
                        />
                        {index > 0 ?
                        <button onClick={() => {
                            if(addresses.length > 1) {
                              const newAddresses = [...addresses];
                              newAddresses.splice(index, 1);
                              setAddresses(newAddresses);
                            }
                         }}>-</button>
                        :
                        <button onClick={() => setAddresses([...addresses, ''])}>+</button>
                        }
                        
                    </div>
                ))}
            </label>

            <div>
                <button onClick={() => window.history.back()}>Back</button>
                <button type="submit" onClick={submit}>Create</button>
            </div>
            
        </div>
    )
}