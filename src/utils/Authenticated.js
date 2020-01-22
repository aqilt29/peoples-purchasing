const useAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        useAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        useAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
}

export default useAuth;