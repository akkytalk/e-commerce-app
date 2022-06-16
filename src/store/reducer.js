export const initialState = {
    basket:[],
    user:null,
    path: '/'
}

//selectors 

export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0)


const reducer = (state, action) => {
    
    console.log(action);
    

    switch(action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
            }; 
        
         case 'EMPTY_BASKET':
           return {
             ...state,
             basket: []
           }    
            
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

                case 'SET_USER':
                  return {
                    ...state,
                    user: action.user
                  }

                case "SET_AUTH_REDIRECT_PATH" :
                  return{
                    ...state,
                    path: action.path
                  }  
             default:
            return state;
    }
}

export default reducer;