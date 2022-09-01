import React, {useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../firebase/AuthProvider'; 

import AuthStack from './Authstack';
import AppNav from './AppNav';

export default function Routes() {

     // Set an initializing state whilst Firebase connects
     const [user, setUser] = useState(AuthContext)
     const [initializing, setInitializing] = useState(true);
 
     // Handle user state changes
     function onAuthStateChanged(user) {
         setUser(user);
         if (initializing) setInitializing(false);
     }
 
     useEffect(() => {
         const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
         return subscriber; // unsubscribe on unmount
 
     }, []);
 
     if (initializing) return null;
 
    return(

        <NavigationContainer>

            {user? <AppNav/> : <AuthStack/>}

        </NavigationContainer>


    )
}