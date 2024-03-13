import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../modules/auth/login/adapters/screens/Login";
import Restaurants from "../../modules/restaurants/adapters/screens/Restaurants";

const Stack = createStackNavigator();

export default function RestaurantsStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Restaurant"
            component={Restaurants}
            options={{title: "Restaurantes"}}
            ></Stack.Screen>

            <Stack.Screen
            name="Login"
            component={Login}
            options={{title:"Inicio de sesion"}}
            ></Stack.Screen>

            
        </Stack.Navigator>
    );
}