const initialState = [] ;

function supplier(state = initialState, action){
    switch(action.type){
        case 'ADD_ALL_SUPPLIER' : 
            state = action.data;
            return state;
        
        case 'ADD_SUPPLIER' : 
            
            state = [...state, action.data]
            return state;

        case 'REMOVE_SUPPLIER' : 
            
            const ndata = state.filter((data)=>{
                return(data._id !== action.data);
            });
            console.log(ndata)
            state = ndata;
            return state;

        case 'UPDATE_SUPPLIER' : 
            
            const edata = state.filter((data)=>{
                return(data._id !== action.data.id);
            });
            const pdata = [...edata,action.data.data];
            state = pdata;
            return state;

        default : return state;
    }

}

export default supplier;