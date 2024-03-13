import {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Input, Button, Icon, Image} from "@rneui/base";
import Logo from '../../../../../../assets/img/mapache.jpg';
import { isEmpty } from 'lodash';
import Loading from '../../../../../kernel/components/Loading';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login(props) {
  const {navigation} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const login = async () => {
    if(!isEmpty(email) && !isEmpty(password)){
      //proceso de login
      //console.log('Listo para iniciar sesion c:');
      setShowErrorMessage(" ");
      setLoading(true);
      try{
        const user = await signInWithEmailAndPassword(auth, email, password)
        navigation.navigate('UserLogged')
      }catch (error){
        //const errorCode = error.code;
        //const errorMessage = error.message;
        setShowErrorMessage('Usuario o contraseña incorrectos');
      }finally{
        setLoading(false);
      }
    }else{
      setShowErrorMessage('Campos obligatorios xd');
    }
  }

  return (
    <View style={styles.container}>
      <Image 
        source={Logo}
        style={styles.logo}
        containerStyle={styles.logoContainer}
      ></Image>
      <Input
        placeholder="example@utez.edu.mx"
        onChangeText={(text) => setEmail(text)}

        label="Correo electrónico *"
        labelStyle={styles.label}
        containerStyle={styles.input}
        keyboardType='email-address'
        rightIcon={
          <Icon
            type='material-community'
            name='email'
            color='#ef524a'
          ></Icon>}
        errorMessage={showErrorMessage}
      ></Input>
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
        title="Iniciar sesión"
        onPress={login}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnStyle}
      />

      <Loading isShow={loading} title="Iniciando sesión"></Loading>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    padding: 16,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    marginBottom: 16
  },
  logoContainer:{
    marginBottom:16
  },
  input:{
    marginVertical: 8,
    paddingHorizontal: 30,
  },
  label: {
    color: "#88c040",
    fontSize: 16,
  },
  btnContainer:{
    width: '80%',
  },
  btnStyle:{
    backgroundColor: '#ef524a'
  },
});
