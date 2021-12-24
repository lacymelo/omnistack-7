import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, TouchableOpacity } from "react-native";

import Feed from "./pages/Feed";
import New from "./pages/New";

import logo from './assets/logo.png';
import camera from './assets/camera.png';


const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Feed" component={Feed}
                    options={({navigation}) => ({
                        headerTitleAlign: 'center',
                        headerTitle: () => (
                            <Image
                            source={logo}
                            />
                        ),
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('New')}>
                                <Image source={camera} />
                            </TouchableOpacity>
                        )
                    })} 
                />

                <Stack.Screen name="New" component={New} 
                    options={{
                        headerTitleAlign: 'center',
                        title: 'Nova Publicação',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}