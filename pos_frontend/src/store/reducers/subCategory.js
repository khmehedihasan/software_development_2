const initialState = [] ;

function subCategory(state = initialState, action){
    switch(action.type){
        case 'ADD_ALL_SUB_CATEGORY' : 
            state = action.data;
            return state;


        case 'ADD_SUB_CATEGORY' : 
            
            state = [...state, action.data]
            return state;

        case 'REMOVE_SUB_CATEGORY' : 
            
            const ndata = state.filter((data)=>{
                return(data._id !== action.data);
            });
            state = ndata;
            return state;

        case 'UPDATE_SUB_CATEGORY' : 
            
            const edata = state.filter((data)=>{
                return(data._id !== action.data.id);
            });
            const pdata = [...edata,action.data.data];
            state = pdata;
            return state;

        default : return state;
    }

}

export default subCategory ;