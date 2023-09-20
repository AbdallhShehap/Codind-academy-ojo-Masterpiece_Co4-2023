import { useState, useRoute, useNavigation } from "@react-navigation/native";
import {
   View,
   Text,
   Image,
   FlatList,
   StyleSheet,
   Dimensions,
   Pressable,
   Button,
   TouchableOpacity,
   Alert,
} from "react-native";
import React, { useLayoutEffect, useRef } from "react";
import carousel from "../../data/carousel";
import Slider from "../../Components/Slider";
import { useCartsContext } from "../../hooks/useCartContext";
const { width, height } = Dimensions.get("window");
// import CarouselComponent from "../HomeScreen/components/CarouselComponent";

export default function ProductDetails() {
   const { dispatch } = useCartsContext();
   const navigation = useNavigation();
   const route = useRoute();
   const { params } = route;

   useLayoutEffect(() => {
      navigation.setOptions({
         headerTitle: params.item.title,
         headerShown: true,
      });
   }, []);

   return (
      <View style={styles.productContainer}>
         <Slider params={params} />
         <View style={styles.productDetailsContainer}>
            <View style={styles.productHeader}>
               <View>
                  <Text style={styles.text}>{params.item.title}</Text>
               </View>
               <View>
                  <Text style={[styles.text, styles.textColor]}>
                     {params.item.price}$
                  </Text>
               </View>
            </View>
            <View style={styles.section}>
               <Text style={styles.sectionTitle}>Description</Text>
               <Text style={styles.sectionBody}>{params.item.description}</Text>
            </View>
            <View style={styles.section}>
               <Text style={styles.sectionTitle}>Brand</Text>
               <Text style={styles.sectionBody}>{params.item.brand}</Text>
            </View>
            <View
               style={{
                  justifyContent: "flex-end",
                  flex: 1,
                  width: "100%",
               }}
            >
               <Pressable
                  onPress={() => {
                     Alert.alert("", "Added to cart ");
                     console.log(params.item);
                     dispatch({ type: "ADD_CARD", payload: params.item });
                     navigation.goBack();
                  }}
               >
                  <Text
                     style={{
                        backgroundColor: "#FF9900",
                        padding: 10,
                        textAlign: "center",
                        color: "white",
                        fontWeight: "700",
                        fontSize: 18,
                        borderRadius: 6,
                     }}
                  >
                     Add To Card
                  </Text>
               </Pressable>
            </View>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   productContainer: {
      flex: 1,
   },
   productDetailsContainer: {
      padding: 15,
      paddingTop: 0,
      flex: 1,
      position: "relative",
   },
   productHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
   },
   section: {
      marginTop: 10,
      borderTopColor: "grey",
      borderTopWidth: 1,
      paddingTop: 10,
   },
   sectionTitle: {
      fontSize: 18,
      color: "#FF9900",
      fontWeight: "bold",
      marginBottom: 5,
   },
   sectionBody: {},
   botton: {
      borderRadius: 5,
   },
   text: {
      fontSize: 18,
      fontWeight: "700",
   },
   textColor: {
      color: "#FF9900",
   },
});
