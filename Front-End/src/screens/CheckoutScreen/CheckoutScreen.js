import {
  Frames,
  CardNumber,
  ExpiryDate,
  Cvv,
  SubmitButton,
} from "frames-react-native";

import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { useCartsContext } from "../../hooks/useCartContext";
import { useNavigation } from "@react-navigation/native";

export default function CheckoutScreen() {
  const { cards, dispatch } = useCartsContext();
  const [price, setPrice] = useState(0);
  const cartProducts = [];
  const { navigate } = useNavigation();

  const totalPrice = cartProducts.reduce(
    (total, product) => total + product.price,
    0
  );
  useEffect(() => {
    let TotalPrice = 0;
    cards.map((item) => {
      TotalPrice += item?.price;
    });
    setPrice(TotalPrice);
  }, [cards]);

  console.log("price", price);
  return (
    <View style={styles.container}>
      <Text style={styles.total}>Total : ${price.toFixed(2)}</Text>
      <View style={styles.cont}>
        <Frames
          config={{
            debug: true,
          }}
          cardTokenized={(e) => {
            alert(e.token);
          }}
        >
          <CardNumber
            style={styles.cardNumber}
            placeholderTextColor="#9898A0"
          />

          <View style={styles.dateAndCode}>
            <ExpiryDate
              style={styles.expiryDate}
              placeholderTextColor="#9898A0"
            />
            <Cvv style={styles.cvv} placeholderTextColor="#9898A0" />
          </View>

          <SubmitButton
            title="Pay Now"
            style={styles.button}
            textStyle={styles.buttonText}
            onPress={() => {
              Alert.alert(
                "Your Payment Transaction was don successfully!",
                "Thank you for choosing OpenShop",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      dispatch({ type: "DELETE_ALL_CARD" });
                      navigate("HomeScreen");
                    },
                  },
                ]
              );
            }}
          />
        </Frames>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 80,
    paddingLeft: 10,
    paddingRight: 10,
  },
  total: {
    marginTop: 150,
    fontWeight: 500,
    fontSize: 15,
    marginBottom: 40,
  },
  dateAndCode: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardNumber: {
    fontSize: 18,
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#3A4452",
    borderRadius: 5,
    borderWidth: 0,
  },
  expiryDate: {
    fontSize: 18,
    height: 50,
    width: "48%",
    backgroundColor: "#fff",
    borderWidth: 0,
  },
  cvv: {
    fontSize: 18,
    height: 50,
    width: "48%",
    backgroundColor: "#fff",
    borderWidth: 0,
  },
  button: {
    height: 50,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: "center",
    backgroundColor: "#FF9900",
  },
  buttonText: {
    fontWeight: 600,
    color: "white",
    fontSize: 16,
  },
});
