import {} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/config/navigation/Navigation';
import{app, auth, db} from './src/config/util/firebaseConnection';

export default function App() {
  return (
   <Navigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center', //horizontal
    justifyContent: 'center', //vertical
  },
});
