//rnf
import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
//importacion que saque de la documentacion de firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from '../../../../../kernel/components/Loading';
import Profile from './Profile';
import UserGuest from '../../../login/adapters/screens/UserGuest'

export default function UserLogged(props) {
    const {navigation} = props;
    const [session, setSession] = useState(null);
    const auth = getAuth();
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setSession(true);
            } else {
              setSession(false);
            }
          });
    }, []);//todo lo que tenga true se repite en la cajita
    if(session === null ){
        return (<Loading isShow={true} tittle="Cargando" />)
    }else {
        return (session ? <Profile  navigation={navigation}/>: <UserGuest navigation={navigation}/>)
    }

  
}