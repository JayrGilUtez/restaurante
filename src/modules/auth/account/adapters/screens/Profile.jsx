//rnfs
import { StyleSheet, Text, View } from 'react-native'
import { getAuth, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth';
import { Button, Avatar } from '@rneui/themed';
import PhotoProfile from '../components/PhotoProfile';

export default function Profile(props) {
  const { navigation } = props;
  const auth = getAuth();
  const logout = () => {
    signOut(auth).then(() => {
      navigation.navigate('UserLogged');
    }).catch((error) => {
      console.error(error);
    });
  }
  const user = auth.currentUser;
  const [userProfile, setUserProfile] = useState(null);
  useEffect(()=>{
    if (user !== null) {
      user.providerData.forEach((profile) => {
        setUserProfile(profile);
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  PhotoURL: " + profile.photoURL);
      });
    }
  }, [])
  /*
  const updateProfileData = ()=>{
    console.log('Actualizar perfil :O');
    updateProfile(auth.currentUser, {
      displayName: "Diego Jesus Hernandez Palma", photoURL: "https://firebasestorage.googleapis.com/v0/b/restauranteb-e69c3.appspot.com/o/avatar%2Fsn0K2BmevIVwVnJfmhViraxJM1D2.jpg?alt=media&token=905ba4b4-d0e9-4c20-a20e-a867d0a09119"
    }).then(() => {
      console.log('va listo');
    }).catch((error) => {
      console.log('error', error)
    });
  }
  <Button buttonStyle={styles.btnUpdate} title="Actualizar perfil" onPress={updateProfile}></Button>
  */
  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Usted ha entrado a su Perfil</Text>
      {
        userProfile && <PhotoProfile infoUser={userProfile}></PhotoProfile>
      }
      <Button buttonStyle={styles.btnLogout} title="Cerrar sesión" onPress={logout}></Button>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,//un entero
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding:16,
  },
  colum:{
    flexDirection: 'column',
    marginLeft:16,
  },
  row: {
    flexDirection:'row',
    alignItems:'left',
    marginBottom:14,
    padding:16,
  },
  btnLogout: {
    marginTop: 20,
    backgroundColor: '#ef524a',//ff5733
    paddingHorizontal: 20,
  },
  btnUpdate:{
    backgroundColor: '#38BB08',
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', // COLOR TEXTO
    textAlign: 'center',
  },
  nombreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333', 
    textAlign: 'left',
  },
  correoText: {
    fontSize: 12,
    //fontWeight: 'bold',
    color: '#333', 
    textAlign: 'left',
  },
})