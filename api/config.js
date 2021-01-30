module.exports = {
  envPort: 3000,
  dbURL: "mongodb+srv://root:root@cluster0.pdyt1.mongodb.net/layertechdb?retryWrites=true&w=majority", //process.env.MONGODB_URL,
  sessionKey: process.env.SESSION_SECRET,
};
