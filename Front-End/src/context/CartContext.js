import { createContext, useReducer } from "react";

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CARD":
      return {
        cards: action.payload,
      };
    case "ADD_CARD":
      return {
        cards: [action.payload, ...state.cards],
      };
    case "DELETE_CARD":
      return {
        cards: state.cards.filter((w) => w._id !== action.payload._id),
      };
    case "DELETE_ALL_CARD":
      return {
        cards: [],
      };
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cards: [],
  });
  console.log("CardsContext state", state);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
