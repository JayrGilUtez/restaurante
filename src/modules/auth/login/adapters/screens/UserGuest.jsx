import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Image, Button} from '@rneui/base'
import Logo from '../../../../../../assets/img/mapache.jpg'
/*
import { useNavigation } from '@react-navigation/native'
const Navigation = useNavigation;
*/
export default function UserGuest(props) {
    const {navigation} = props;
  return (
    <View style={styles.container}>
        <Image source={Logo}
        style={styles.logo}
        containerStyle={styles.logoContainer}
        ></Image>
        <Text style={styles.title}>
        ¡Descubre tu próximo restaurante favorito con nuestra aplicación! 🍽✨
        </Text>
        <Text style={styles.description}>
            En nuestra plataforma, explorarás una variedad increíble de restaurantes para cualquier ocasión, gusto o antojo. ¿Amante de la comida italiana, fanático de la comida rápida o en busca de la experiencia gourmet más refinada? Lo tenemos todo cubierto.
        </Text>
        <Button
        title='Inicia sesion .v.'
        type='clear'
        containerStyle={{padding:16}}

        onPress={()=> navigation.navigate("Login")}
        ></Button>
        <Button
        title='Crea tu cuenta .-.'
        type='clear'
        containerStyle={{ padding: 16 }}
        onPress={() => {
          navigation.navigate("CreateAccount");
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
        padding:16
      },
      title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
        textAlign: 'center',
        lineHeight: 25,
      },
      description: {
        fontSize: 12,
        fontWeight: "normal",
        marginBottom: 20,
        color: "#333",
        textAlign: 'auto',
        lineHeight: 20,
      },
      logo: {
        width: 120,
        height: 120,
        resizeMode: 'cover',//containt
        marginBottom: 16
      },
      logoContainer:{
        marginBottom:16
      }
});