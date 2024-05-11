# MERN Booking Application

This is a Booking room hotel full-stack application built with MongoDB, Express.js, React.js, and Node.js (MERN stack). It includes a backend server and a frontend client.

## Technologies Used

This project uses a variety of technologies to provide a full-stack application experience:

- **MongoDB**: A NoSQL database used to store application data. Connection details are specified in the `.env` file.

- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- **React.js**: A JavaScript library for building user interfaces. It allows us to build reusable UI components.

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine. It's used to build the server-side of the application.

- **Mapbox**: An open-source mapping platform for custom designed maps. We use it for location-based features in the application. You need to provide a Mapbox secret token in the `.env` file.

- **Stripe**: An online payment processing platform that allows businesses to send and receive payments over the internet. Stripe's secret key needs to be specified in the `.env` file.

- **Nodemailer**: A module for Node.js applications to allow easy email sending. The application uses Nodemailer to send booking confirmation emails.

- **Cloudinary**: A cloud-based service that provides an end-to-end image and video management solution. It is used in this application for image uploading and hosting.

Remember to fill in the necessary environment variables in the `.env` file for these services to function correctly.

## Backend

The backend is a Node.js server built with Express.js. It connects to a MongoDB database and provides a RESTful API for the frontend.

### Setup

1. Navigate to the `backend` directory.
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env` and fill in your environment variables.
4. Run the server with `npm run dev`.

The server will start on the port specified in your `.env` file (default is 5000).

### Scripts

- `dev`: Starts the server in development mode with hot-reloading.
- `build`: Compiles the TypeScript code to JavaScript.
- `start`: Starts the compiled JavaScript server.
- `debug`: Starts the server in debug mode.
- `e2e`: Starts the server in end-to-end testing mode.
- `seed`: Seeds the database with initial data.

## Frontend

The frontend is a React.js application built with Vite.

### Setup

1. Navigate to the `frontend` directory.
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env` and fill in your environment variables.
4. Run the client with `npm run dev`.

The client will start on the port specified in your `.env` file (default is 3000).

### Scripts

- `dev`: Starts the client in development mode with hot-reloading.
- `debug`: Starts the client in debug mode on port 4000.
- `build`: Compiles the TypeScript code and builds the production version of the client.
- `lint`: Runs ESLint on the codebase.
- `preview`: Previews the production build.

## Testing

Both the backend and frontend include unit tests. Run `npm test` in either directory to run the tests.

## Deployment

Both the backend and frontend can be built for production using the `build` script. This will create a `dist` directory with the compiled JavaScript code.

## Contributing

Contributions are welcome! Please read the contributing guide for more information.

## License

This project is licensed under the ISC license.