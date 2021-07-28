import React, {useState, useEffect} from 'react';
import UpdateProfile from './components/UpdateProfile'
import firebase from './firebase'
 
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
        return <h1 className="pt-3 text-center">loading...</h1>;      
    }

    return (
        <div>
            <div className="row pt-4">
                <div className="col-sm-6 offset-3">
                <UpdateProfile/>
                </div>
            </div>
        </div>
    );
}

export default Settings;
