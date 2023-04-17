const initialState = [] ;

function customer(state = initialState, action){
    switch(action.type){
        case 'ADD_ALL_CUSTOMER' : 
            state = action.data;
            return state;
        
        case 'ADD_CUSTOMER' : 
            
            state = [...state, action.data]
            return state;

        case 'REMOVE_CUSTOMER' : 
            
            const ndata = state.filter((data)=>{
                return(data._id !== action.data);
            });
            console.log(ndata)
            state = ndata;
            return state;

        case 'UPDATE_CUSTOMER' : 
            
            const edata = state.filter((data)=>{
                return(data._id !== action.data.id);
            });
            const pdata = [...edata,action.data.data];
            state = pdata;
            return state;

        default : return state;
    }

}

export default customer;