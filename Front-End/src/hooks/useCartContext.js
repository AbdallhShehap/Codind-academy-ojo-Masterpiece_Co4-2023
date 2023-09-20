// import { WorkoutsContext } from '../context/WorkoutContext'
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

export const useCartsContext = () => {
   const context = useContext(CartContext);

   if (!context) {
      throw Error(
         "useWorkoutsContext must be used inside an CartContextProvider"
      );
   }

   return context;
};
