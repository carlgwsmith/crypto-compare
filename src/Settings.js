import React, {useState, useEffect} from 'react';
import ForgotPassword from './components/ForgotPassword'
import firebase from './firebase'
import AddCoins from './components/AddCoins'

const Settings = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const ref = firebase.firestore().collection("users")
    console.log(ref)

    function getUsers() {
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data())
            });
            setUsers(items)
            setLoading(false)
        });
    }

    useEffect(() => {
        getUsers()
    }, []);

    if(loading){
        return <h1>loading...</h1>;      
    }

    return (
        <div>
            <h1>Settings</h1>
            {users.map((users) => (
                <div key={users.id}>
                    <h2>{users.fullname}</h2>
                    <h3>{users.email}</h3>
                </div>
            ))}
            <ForgotPassword/>
            <h2>Add Coins</h2>
            <AddCoins/>
        </div>
    );
}

export default Settings;
