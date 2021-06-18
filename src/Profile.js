import React from 'react';
import Wallet from './components/Wallet'
import AddCoins from './components/AddCoins'
import CoinSearch from './components/CoinSearch'

const Profile = () => {
    return (
        <div>
            <CoinSearch/>
            <AddCoins/>
        </div>
    );
}

export default Profile;
