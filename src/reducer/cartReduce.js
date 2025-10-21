export const shoppingCart ={items:{}, totalItems: 0};

export function CartReducer(state, action){
    switch (action.type){
        case "addItem":{
            const {product} = action.payload;
            const id = product.id;
            const begin = state.items[id] || {product, quantity: 0};
            const addNew = begin.quantity + 1;
            const items = {...state.items, [id]: {...begin, quantity: addNew}};
            const totalItems = state.totalItems + 1;
            return {...state, items, totalItems};
        }
        case "removeItems":{
            const id = action.payload.id;
            if (!state.items[id]) return state;
            const items = { ...state.items };
            const removedItems = items[id].quantity;
            delete items[id];
            return { ...state, items, totalItems: state.totalItems - removedItems };
        }
        case "clearAll":
            return{items:{}, totalItems: 0};
        default:
            return state;
        
    }
}
      