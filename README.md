# Fastify-GraphQL-MongoDB-Demo

This project demonstrates how to build a GraphQL server using Fastify, Mercurius, and MongoDB. It includes user and post management functionalities and showcases CRUD operations through GraphQL.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- A MongoDB account and a database set up.

### Configuring a MongoDB Database

1. Create a MongoDB account here: https://www.mongodb.com.
2. Create a new project and a MongoDB cluster.
3. Create a database and collections as needed.
4. Obtain your MongoDB connection string.

### Installation

1. Clone the repository to your local machine:

```sh
git clone https://github.com/aviperetz91/fastify-graphql-mongodb-demo.git
```

2. Navigate to the project directory:

```sh
cd fastify-graphql-mongodb-demo
```

3. Install dependencies:

```sh
npm install
```

4. Create a .env file in the root directory and add the required environment variables as described in the `.env.example` file.

5. Populate your database with initial data using these commands:

```sh
npm run insertUsers
npm run insertPosts
```

### Running the Server

- To start the server in development mode with hot reload

```sh
npm run dev
```

- To start the server in production mode:

```sh
npm start
```

## Features

- **MongoDB Integration**: Directly interact with MongoDB for CRUD operations.
- **GraphQL API**: Leverage GraphQL using Fastify and Mercurius for efficient data fetching and manipulation.
- **User and Post Management**: Manage user and post data stored in MongoDB.

## Usage

### GraphQL API Endpoint

This project provides a GraphQL API for managing users and posts in a MongoDB database. To interact with the API, ensure your server is running and accessible at `http://localhost:3000/graphql`.
Authentication is required for createPost (just for demonstration purposes), using JSON Web Tokens (JWT) obtained through the signup or login process.

#### Signing Up

- To sign up a new user, use the following GraphQL mutation:

```graphql
mutation {
  signup(
    input: {
      firstName: "John"
      lastName: "Doe"
      email: "john.doe@example.com"
      password: "123456"
      phoneNumber: "1234567892"
      image: "http://example.com/john.jpg"
      addresses: [{ city: "New York", street: "123 Main St", floor: 5, apartment: 10, zipCode: "10001" }]
    }
  ) {
    id
    firstName
    lastName
    email
    password
    phoneNumber
    image
  }
}
```

- Signup Response Example

```json
{
  "data": {
    "signup": {
      "id": "65fbe46a220a46f0de5e4610",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "password": "$2b$12$D.IfppB3tRnS61jfCNbGc.4v.UhgOeHWpraPgSrMJZrv/gMv/YEyy",
      "phoneNumber": "1234567892",
      "image": "http://example.com/john.jpg"
    }
  }
}
```

#### Logging In

- To log in and obtain a JWT, use the following GraphQL query:

```graphql
query {
  login(email: "john.doe@example.com", password: "123456") {
    token
    userId
  }
}
```

- Login Response Example

```json
{
  "data": {
    "login": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWZiZTQ2YTIyMGE0NmYwZGU1ZTQ2MTAiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzIyNDUzMDM5LCJleHAiOjE3MjI0NTY2Mzl9.IKqkLN28q_34XX6qufBCMqdIj_bHYjkPpbuo2-cq4wQ",
      "userId": "65fbe46a220a46f0de5e4610"
    }
  }
}
```

#### Making Authenticated Requests

Once you have obtained a JWT through the signup or login process, include it in the Authorization header of your GraphQL requests to access authenticated routes:

```sh
  --header 'Authorization: Bearer YOUR_JWT_TOKEN'
```

#### Creating a Post

- To create a post, use the following GraphQL mutation

```graphql
mutation {
  createPost(input: { title: "New Post Title", body: "This is the body of the new post.", tags: ["tag1", "tag2"], reactions: 0 }) {
    id
    title
    body
    userId
    tags
    reactions
  }
}
```

- Create Post Response Example

```json
{
  "data": {
    "createPost": {
      "id": "66aa8cf57b7ffbba5f5031ef",
      "title": "New Post Title",
      "body": "This is the body of the new post.",
      "userId": "65fbe46a220a46f0de5e4610",
      "tags": ["tag1", "tag2"],
      "reactions": 0
    }
  }
}
```

#### Fetching all Posts

- To fetch all posts, use the following GraphQL query:

```graphql
query {
  posts {
    id
    title
    body
    userId
    tags
    reactions
  }
}
```

- Fetch Posts Response Example

```json
{
  "data": {
    "posts": [
      {
        "id": "65fbe56353f4e4fa35fccb55",
        "title": "New Post Title",
        "body": "This is the body of the new post.",
        "userId": "65fbe46a220a46f0de5e4610",
        "tags": ["tag1", "tag2"],
        "reactions": 0
      },
      {
        "id": "66aa8cf57b7ffbba5f5031ef",
        "title": "Another Post Title",
        "body": "This is the body of another post.",
        "userId": "78jbe46a568423f0de5e5285",
        "tags": ["tag1", "tag2", "tag3"],
        "reactions": 0
      }
    ]
  }
}
```

#### Fetching Posts by User ID

- To fetch posts by user ID, use the following GraphQL query:

```graphql
query {
  userPosts(userId: "65fbe46a220a46f0de5e4610") {
    id
    title
    body
    userId
    tags
    reactions
  }
}
```

- Fetch Posts by User ID Response Example

```json
{
  "data": {
    "userPosts": [
      {
        "id": "65fbe56353f4e4fa35fccb55",
        "title": "New Post Title",
        "body": "This is the body of the new post.",
        "userId": "65fbe46a220a46f0de5e4610",
        "tags": ["tag1", "tag2"],
        "reactions": 0
      }
    ]
  }
}
```

## Sequence Diagram:

Sequence Diagram example for creating and fetching posts:

```mermaid
sequenceDiagram
    participant Client
    participant Backend
    participant MongoDB as MongoDB Database
    Client->>+Backend: GraphQL Mutation to '/graphql'
    Backend->>+MongoDB: Insert Post
    MongoDB-->>-Backend: Confirmation
    Backend-->>-Client: Mutation Response
    Client->>+Backend: GraphQL Query to '/graphql'
    Backend->>+MongoDB: Fetch Posts
    MongoDB-->>-Backend: Posts Data
    Backend-->>-Client: Query Response
```

Description:

- Client sends a GraphQL mutation to the Backend to create a new post.
- Backend interacts with MongoDB to insert the new post.
- MongoDB confirms the insertion to the Backend.
- Backend sends the mutation response back to the Client.
- Client sends a GraphQL query to fetch posts.
- Backend queries MongoDB for posts data.
- MongoDB returns the posts data to the Backend.
- Backend sends the query response back to the Client.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- [Fastify Documentation](https://fastify.dev/)

- [How To GraphQL](https://www.howtographql.com/)

- [Mercurius Documentation](https://mercurius.dev/#/)

- [MongoDB Documentation](https://www.mongodb.com/docs/)

- [Mongoose Documentation](https://mongoosejs.com/docs/)

- [Jsonwebtoken Package](https://www.npmjs.com/package/jsonwebtoken)

## Contact

Avi Peretz

- Website: [https://www.aviperetz.com](https://www.aviperetz.com/)
- Linkedin: [https://www.linkedin.com/in/avi-peretz-778ba6177](https://www.linkedin.com/in/avi-peretz-778ba6177/)
- Email: aviprz91@gmail.com

Project Link: [https://github.com/aviperetz91/fastify-graphql-mongodb-demo](https://github.com/aviperetz91/fastify-graphql-mongodb-demo)
