//rnfs
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AirbnbRating, Image, Rating } from '@rneui/base';

/*
Lorem ipsum dolor sit amet consectetur adipiscing elit accumsan nullam nisi, vitae est nibh eros orci tempus in pulvinar.
*/
export default function FlatListRestaurant(props) {
    const {image, title, description, rating} = props;
  return (
    <View style={styles.listRestaurant}>
        <Image 
          source={{uri:`${image}`}}
          style={styles.Image}
        ></Image>
        <View style={styles.containerText}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Text style={styles.title}>{title}</Text>
            <AirbnbRating
              count={5}
              isDisabled={true}//esta es nomas para que jale o no jale depende del true o del false
              defaultRating={rating}
              size={10}
              showRating={false}
            ></AirbnbRating>
          </View>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,//un entero
      //justifyContent: 'start',
      //alignItems: 'start',
      backgroundColor: '#f0f0f0', // Puedes cambiar el color de fondo según tus preferencias
      padding:16,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
      marginRight: 8,
      color: "#333",
      textAlign: 'left',
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
    listRestaurant: {
      flex:1,
      flexDirection: "row",
      elevation: 3,
    },
    Image:{
      width:125,
      height:125,
    },
    containerText: {
        flex: 1,
        flexDirection: 'column',
        padding: 8,
        justifyContent: 'space-between', // Ajusta el espacio entre los elementos
      },
  })