import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginStack from "../stack/LoginStack";
import RestaurantsStack from "../stack/RestaurantsStack";
import FavoritesStack from "../stack/FavoritesStack";
import { Icon } from '@rneui/base';


const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const { iconName, iconType } = getIconName(route.name, focused);
          return <Icon name={iconName} type={iconType} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
      >
      <Tab.Screen 
        name="RestaurantsStack" 
        component={RestaurantsStack}  
        options={{title: 'inicio'}}/>

        <Tab.Screen 
        name="FavoritesStack" 
        component={FavoritesStack}  
        options={{title: 'favoritos'}}/>

        <Tab.Screen 
        name="LoginStack" 
        component={LoginStack}  
        options={{title: 'Cuenta'}}/>
        
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const getIconName = (routeName, focused) => {
  let iconName = '';
  let iconType = 'material-community';

  switch (routeName) {
    case 'RestaurantsStack':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'FavoritesStack':
      iconName = focused ? 'heart' : 'heart-outline';
      break;
    case 'LoginStack':
      iconName = focused ? 'account' : 'account-outline';
      break;
    /* Puedes agregar más casos para otras rutas aquí
    default:
      iconName = 'questionmark-circle'; */
  }
  return { iconName, iconType };
};

