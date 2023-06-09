// actions.js
export const setUser = (user) => {
    return {
      type: 'SET_USER',
      payload: user,
    };
  };
  
  export const setCart = (cart) => {
    return {
      type: 'SET_CART',
      payload: cart,
    };
  };
  