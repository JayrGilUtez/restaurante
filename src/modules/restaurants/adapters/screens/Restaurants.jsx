import { StyleSheet, FlatList, ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Icon } from '@rneui/base'
import FlatListRestaurant from './components/FlatListRestaurant'
import Loading from '../../../../kernel/components/Loading'
/*
<Text style={styles.title}>Usted ha entrado a los restaurantes</Text>
      <Text> 
        <Icon
        name='gamepad'
        type='font-awesome'
        color='grey'
        size={40}
        ></Icon>
      </Text>
*/
export default function Favorites() {
  /* //Ejemplo de un arreglo para mostrar con cards
  const restaurants=[
    {
      uid:1,
      image: 'https://s1.eestatic.com/2018/07/09/actualidad/actualidad_321231184_86199176_1706x960.jpg', 
      title: 'Rincón De Giorgio',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit accumsan nullam nisi, vitae est nibh eros orci tempus in pulvinar.',
      rating: 4,
    },
    {
      uid:2,
      image:'https://www.eloccidental.com.mx/incoming/r38hcw-raccoon-750394_1920.jpg/ALTERNATES/LANDSCAPE_768/raccoon-750394_1920.jpg',      
      title: 'El boti',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit accumsan nullam nisi, vitae est nibh eros orci tempus in pulvinar.',
      rating: 3,
    },
    {
      uid:3,
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbtxZ_l88QGVEkcoqNjINzKRrUPgDLLN8iewX7Ah2ULJlDe5vhp66a5oNmYFFly9U0MZk&usqp=CAU',      
      title: 'El Mariscos',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit accumsan nullam nisi, vitae est nibh eros orci tempus in pulvinar.',
      rating: 5,
    },
    {
      uid:4,
      image:'data:image/jpeg;base64,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',      
      title: 'Don Camaron',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit accumsan nullam nisi, vitae est nibh eros orci tempus in pulvinar.',
      rating: 2,
    },
    {
      uid:5,
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4IgGPbyo4gcv0i0Ut4IvMxh4283F7kQY2R7bQKflgxWd5Q5eLeY2s-v2c13M5i21Twbc&usqp=CAU',      
      title: 'Korn',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit accumsan nullam nisi, vitae est nibh eros orci tempus in pulvinar.',
      rating: 2,
    },
    {
      uid:6,
      image:'https://static.demilked.com/wp-content/uploads/2023/07/funny-photos-cursed-images-18.jpg',      
      title: 'El pica hielo',
      description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit accumsan nullam nisi, vitae est nibh eros orci tempus in pulvinar.',
      rating: 1,
    },
  ];
  */
  const db = getFirestore();
  const [restaurants, setRestaurants] = useState(null);
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    (async()=>{
      try{
        const querySnapshot = await getDocs(collection(db, "restaurants"));
        const arrayRestaurants = [];
        querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()['title']}`);
        arrayRestaurants.push({
          uid: doc.id,
          image: doc.data()['image'],
          title: doc.data()['title'], 
          description: doc.data()['description'],
          rating: doc.data()['rating']
        });
        setRestaurants(arrayRestaurants);
      });
      }catch (error){
        console.log("error", error)
      }finally{
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        renderItem={({item}) => 
          <FlatListRestaurant
          image={item.image}
          title={item.title}
          description={item.description}
          rating={item.rating}
          ></FlatListRestaurant>
        }
        keyExtractor={item => item.uid.toString()}
      />
      <Loading isShow={loading} title='Cargando'></Loading>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,//un entero
    //justifyContent: 'start',
    //alignItems: 'start',
    backgroundColor: '#f0f0f0',
    padding:16,
  },
})
