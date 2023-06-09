const userReducer = (state = null, action) => {
    switch (action.type) {
      case 'SET_USER':
        return action.payload;
      default:
        return state;
    }
  };
  
  const cartReducer = (state = null, action) => {
    switch (action.type) {
      case 'SET_CART':
        return action.payload;
      default:
        return state;
    }
  };
  
  export { userReducer, cartReducer };