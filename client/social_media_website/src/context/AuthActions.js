export const LoginStart = () => ({
    type: "LOGIN_START",
});

export const LoginSuccess = (userCredentials) => ({
    type: "LOGIN_SUCCESS",
    payload: userCredentials,
});

export const LoginFailure = () => ({
    type: "LOGIN_FAILURE",
});

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
});

export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
});

export const SetProfilePicture = (profilePicture) => ({
    type: "PROFILE_PICTURE",
    payload: profilePicture,
});