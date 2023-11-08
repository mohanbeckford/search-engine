const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3001;

const { typeDefs, resolvers } = require('./schema/index');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017', {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});



// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // Implement your authentication logic here
    let user = null;

    // Check the authorization headers or cookies, depending on your authentication method
    const token = req.headers.authorization || req.cookies.token;

    // If a token is present, verify it and find the user
    if (token) {
      try {
        // validate user in db
        user = await verifyAndFindUser(token);
      } catch (error) {
        // Handle token verification errors
        console.error('Token verification error:', error);
      }
    }

    return {
      user, 
    };
  },
});

// Start Apollo Server and apply middleware to Express
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`🚀 Apollo Server is now running on http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
