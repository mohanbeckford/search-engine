const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { typeDefs, resolvers } = require('./schema/index');


// // Import your schema and resolvers here
// const typeDefs = fs.readFileSync('./schema/index', { encoding: 'utf-8' });
// const resolvers = require('./schema/index');

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://mohanbeckford1:Tech263nose685%40@cluster0.6plsglq.mongodb.net', {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());



app.use(cors({
  origin: 'https://search-eng-db4a6a4c5447.herokuapp.com/', 
  credentials: true, 
}));



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
