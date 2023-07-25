export default (state, action) => {
    switch(action.type){
        case 'JOINED':
            return {
                ...state,
                isAuth: true,
                roomId: action.payload.roomId,
                userName: action.payload.userName,
            };
        
        case 'SET_USERS':
            return{
                ...state,
                users: action.payload
            };

        default:
            return state;
    }
}