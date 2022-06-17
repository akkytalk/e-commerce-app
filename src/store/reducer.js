export const initialState = {
  basket: [],
  user: null,
  path: "/",
  search: "",
};

//selectors

export const getBasketTotal = (basket) =>
  basket?.reduce(
    (amount, item) => Number(item.price) * Number(item.quantity) + amount,
    0
  );

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.item.id
            ? {
                ...item,
                quantity: Number(item.quantity) + Number(action.item.quantity),
              }
            : item
        ),
      };
    case "REPLACE_QUANTITY":
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.item.id
            ? {
                ...item,
                quantity: Number(action.item.quantity),
              }
            : item
        ),
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketitem) => basketitem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn("Cannot remove product. Not in cart");
      }
      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_AUTH_REDIRECT_PATH":
      return {
        ...state,
        path: action.path,
      };
    case "SET_SEARCH":
      return {
        ...state,
        search: action.search,
      };
    default:
      return state;
  }
};

export default reducer;
