import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Input, Button, Icon, Image } from "@rneui/base";
import Logo from "../../../../../../assets/img/newmapache1.jpg";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { isEmpty } from "lodash";
import Loading from "../../../../../kernel/components/Loading";

export default function CreateAccount(props) {
  const auth = getAuth();
  const { navigation } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const [showErrorMessage, setShowErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!isEmpty(email) && !isEmpty(password)) {
      setShowErrorMessage("");
      setLoading(true);
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        navigation.navigate("UserLogged");
      } catch (error) {
        setShowErrorMessage("El correo ya esta registrado :c");
      } finally {
        setLoading(false);
      }
    } else {
      setShowErrorMessage("Campos obligatorios xd");
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={Logo}
        style={styles.logo}
        containerStyle={styles.logoContainer}
      ></Image>
      <Input
        placeholder="example@utez.edu.mx"
        // onChangeText={element => setEmail(element)}
        onChange={({ nativeEvent: { text } }) => setEmail(text)}
        label="Correo electrónico *"
        labelStyle={styles.label}
        containerStyle={styles.input}
        keyboardType="email-address"
        rightIcon={<Icon type="material-community" name="at" color="#EB5249" />}
        errorMessage={showErrorMessage}
      />
      <Input
        placeholder="************"
        onChangeText={(text) => setPassword(text)}

        label="Contraseña *"
        labelStyle={styles.label}
        containerStyle={styles.input}
        secureTextEntry={showPassword}
      rightIcon={
      <Icon 
        color='#ef524a'
        type='material-community' 
        name={showPassword ? 'eye-off-outline': 'eye-outline'}
        onPress={()=> setShowPassword(!showPassword)}
        ></Icon>}
        errorMessage={showErrorMessage}
      ></Input>
      <Button
				title="Crear cuenta"
				onPress={register}
				containerStyle={styles.btnContainer}
				buttonStyle={styles.btnStyle}
			/>
      <Loading isShow={loading} title={"Creando cuenta"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,//un entero
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f0f0f0', // Puedes cambiar el color de fondo según tus preferencias
},
title: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#333', // Puedes ajustar el color del texto
  textAlign: 'center',
},
logo: {
  width: 120,
  height: 120,
  resizeMode: 'cover',//countaint
  marginBottom: 16
},
logoContainer:{
  marginBottom:16
},
input: {
  marginVertical: 8,
  paddingHorizontal: 16,
},
label: {
  color: "#88BF40",
  fontSize: 16,
},
btnContainer: {
  width: "80%",
},
btnStyle: {
  backgroundColor: "#EB5149",
},
})