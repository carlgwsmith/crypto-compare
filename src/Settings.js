import React, {useState, useEffect} from 'react';
import ForgotPassword from './components/ForgotPassword'
import firebase from './firebase'
import AddCoins from './components/AddCoins'

const Settings = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const ref = firebase.firestore().collection("users")

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
            <ForgotPassword/>
        </div>
    );
}

export default Settings;
