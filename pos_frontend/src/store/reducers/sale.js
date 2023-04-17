const initialState = [] ;

function sale(state = initialState, action){
    switch(action.type){
        case 'ADD_ALL_SALE' : 
            state = action.data;
            return state;

        case 'ADD_SALE' : 
            
            state = [action.data, ...state ]
            return state;

        default : return state;
    }

}

export default sale;