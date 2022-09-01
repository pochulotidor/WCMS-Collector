import React from 'react';
import { AuthProvider } from '../firebase/AuthProvider';
import Routes from './Routes';

export default function Providers() {
    return(
        <AuthProvider>
            <Routes/>
        </AuthProvider>
    )
}