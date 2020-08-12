const apolloClientOptions = {
    uri: process.env.NODE_ENV ==="devalopment"
    ? "http://192.168.0.7:4000"
    : "https://keanghogram-backend.herokuapp.com/"
};

export default apolloClientOptions;