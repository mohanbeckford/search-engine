const { User, Book } = require('../models'); 
const bcrypt = require('bcrypt');

const resolvers = {
  Query: {
    getUserById: async (_, { userId }) => {
      try {
        // Retrieve a user by their ID from your database
        const user = await User.findById(userId);
        return user;
      } catch (error) {
        throw new Error('User not found');
      }
    },
    // You can add more query resolvers as needed
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        // Create a new user in your database
        const user = await User.create({ username, email, password });
        return user;
      } catch (error) {
        throw new Error('User registration failed');
      }
    },
    loginUser: async (_, { email, password }) => {
      try {
        // Find the user by email in your database
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error('User not found');
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error('Incorrect password');
        }

        return user;
      } catch (error) {
        throw new Error('Login failed');
      }
    },
    addBookToUser: async (_, { userId, authors, description, bookId, image, link, title }) => {
      try {
        // Create a new book using the book details
        const newBook = { authors, description, bookId, image, link, title };

        // Find the user by ID and push the new book to their savedBooks array
        const user = await User.findByIdAndUpdate(
          userId,
          { $push: { savedBooks: newBook } },
          { new: true }
        );

        return user;
      } catch (error) {
        throw new Error('Adding a book to the user failed');
      }
    },
    // more
  },
};

module.exports = resolvers;
