const initialState = [] ;

function purchase(state = initialState, action){
    switch(action.type){
        case 'ADD_ALL_PURCHASE' : 
            state = action.data;
            return state;
        
        case 'ADD_PURCHASE' : 
            
            state = [action.data, ...state ]
            return state;
           

        default : return state;
    }

}

export default purchase;