import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function CartItem({ card }) {
   return (
      <View style={styles.card}>
         <View style={styles.cardLeft}>
            <Image
               source={{
                  uri: card.thumbnail,
               }}
               style={{ width: 50, height: 50 }}
            />
            <View>
               <Text>{card.title}</Text>
               <Text>{card.price}$</Text>
            </View>
         </View>
         <View>
            <Text>1</Text>
         </View>
      </View>
   );
}
const styles = StyleSheet.create({
   card: {
      width: "100%",
      backgroundColor: "white",
      padding: 30,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 10,
      marginBottom: 10,
   },
   cardLeft: { flexDirection: "row", gap: 20, alignItems: "center" },
});
