export const SignInReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_SIGN_IN':
            return {
                userToken: action.payload.userToken,
                _id: action.payload._id,
            };
        default:
            return state;
    }
};
