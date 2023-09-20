import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
import { CartContextProvider } from "./src/context/CartContext";

export default function App() {
   return (
      <CartContextProvider>
         <SafeAreaView style={styles.container}>
            <AppNavigator />

            <StatusBar style="auto" />
         </SafeAreaView>
      </CartContextProvider>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
});
