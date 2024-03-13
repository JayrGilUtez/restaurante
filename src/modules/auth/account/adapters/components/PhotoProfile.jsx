//rnfs
//Descargas
//npx expo install expo-image-picker
//npx expo install expo-permissions
//npx expo install expo-media-library
import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Avatar } from '@rneui/base';
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library';
import { getAuth, updateProfile} from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import UsuarioPhoto from '../../../../../../assets/img/fotoPerfilNon.jpeg'

export default function PhotoProfile(props) {
    const { infoUser: {photoURL, displayName, email} } = props;
    const uploadPhotoUrl = () =>{
        const storage = getStorage();
        getDownloadURL(ref(storage, `avatar/${uid}`)).then((url) => {
            const auth = getAuth();
            updateProfile(auth.currentUser, {photoURL: url})
        })
    };
    const uploadImage = async (uri)=>{
        const response = await fetch(uri);
        const {_bodyBlob} = response;
        const storage = getStorage;
        const storageRef = ref (storage, `avatar/${uid}`)
        return uploadBytes(storageRef, _bodyBlob);
    };
    const changeAvatar = async () => {
        const resultPermission = await MediaLibrary.requestPermissionsAsync(MediaLibrary.CAMERA)
        if(resultPermission.status === "granted"){
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect:[4,3],
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                //base64: true,
            });
            if(!result.canceled){
                uploadImage(result.uri).then(()=>{
                    uploadPhotoUrl();
                }).catch((error)=>{
                    alert("Error al subir la imagen");
                    console.log('Error al subir la imagen');
                })
            }
        }else {
            alert("Necesitas dar permisos a la camara");
            return;
        }
    };
  return (
    <View style={styles.row}>
        <Avatar
          size={64}
          rounded
          source={photoURL? {uri: photoURL} : UsuarioPhoto}
        >
          <Avatar.Accessory size={24} onPress={changeAvatar} />
        </Avatar>
        <View style={styles.colum}>
          <Text style={styles.nombreText}>{displayName || 'Anónimo'}</Text>
          <Text style={styles.correoText}>{email || ''}</Text>
        </View>
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