import React from "react";
import AuthScreen from "../screens/AuthScreen/AuthScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DiscoverScreen from "../screens/DiscoverScreen/DiscoverScreen";
import ProductDetails from "../screens/DetailsScreen/ProductDetails";
import Cart from "../screens/CartScreen/Cart";
import CheckoutScreen from "../screens/CheckoutScreen/CheckoutScreen";

const AppNavigator = () => {
   const Stack = createStackNavigator();

   return (
      <NavigationContainer>
         <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen
               name="AuthScreen"
               component={AuthScreen}
               options={{ headerShadowVisible: false, headerShown: false }}
            />
            <Stack.Screen
               name="HomeScreen"
               component={HomeScreen}
               options={{ headerShown: false }}
            />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen
               name="DiscoverScreen"
               component={DiscoverScreen}
               options={{ headerShown: true }}
            />
            <Stack.Screen
               name="Cart"
               component={Cart}
               options={{ headerShown: true }}
            />
            <Stack.Screen
               name="CheckoutScreen"
               component={CheckoutScreen}
               options={{ headerShown: true }}
            />
         </Stack.Navigator>
      </NavigationContainer>
   );
};

export default AppNavigator;
