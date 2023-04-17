const initialState = [] ;

function product(state = initialState, action){
    switch(action.type){
        case 'ADD_ALL_PRODUCT' : 
            state = action.data;
            return state;
        
        case 'ADD_PRODUCT' : 
            
            state = [...state, action.data]
            return state;

        case 'REMOVE_PRODUCT' : 
            
            const ndata = state.filter((data)=>{
                return(data._id !== action.data);
            });
            state = ndata;
            return state;

        case 'UPDATE_PRODUCT' : 
            
            const edata = state.filter((data)=>{
                return(data._id !== action.data.id);
            });
            const pdata = [...edata,action.data.data];
            state = pdata;
            return state;

        default : return state;
    }

}

export default product;