# uber# Uber Clone

This project is a clone of the Uber application, built with a Node.js backend and a React frontend. It includes features such as user and captain registration, login, ride creation, fare calculation, and real-time ride tracking using Socket.io.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User and Captain registration and login
- Ride creation and fare calculation
- Real-time ride tracking using Socket.io
- Google Maps integration for location and distance calculation
- Authentication and authorization using JWT
- Secure password hashing with bcrypt

## Technologies Used

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React, Vite, Tailwind CSS
- Real-time communication: Socket.io
- Authentication: JWT, bcrypt
- Google Maps API for location and distance calculation


## Installation

### Backend

1. Navigate to the `backend` directory:

    ```sh
    cd backend
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    GOOGLE_MAPS_API=your_google_maps_api_key
    ```

4. Start the backend server:

    ```sh
    npm start
    ```

### Frontend

1. Navigate to the `frontend` directory:

    ```sh
    cd frontend
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the `frontend` directory and add the following environment variables:

    ```env
    VITE_API=http://localhost:3001
    VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
    ```

4. Start the frontend development server:

    ```sh
    npm run dev
    ```

## Usage

1. Open your browser and navigate to `http://localhost:5173` to access the frontend.
2. Use the application to register as a user or captain, log in, and create rides.

## API Endpoints

### User Routes

- `POST /users/register` - Register a new user
- `POST /users/login` - Login as a user
- `GET /users/profile` - Get user profile
- `GET /users/logout` - Logout user

### Captain Routes

- `POST /captains/register` - Register a new captain
- `POST /captains/login` - Login as a captain
- `GET /captains/profile` - Get captain profile
- `GET /captains/logout` - Logout captain

### Ride Routes

- `POST /rides/create` - Create a new ride
- `GET /rides/get-fare` - Get fare for a ride
- `POST /rides/confirm` - Confirm a ride
- `GET /rides/start-ride` - Start a ride
- `POST /rides/end-ride` - End a ride

### Map Routes

- `GET /maps/get-coordinates` - Get coordinates for an address
- `GET /maps/get-distance-time` - Get distance and time between two locations
- `GET /maps/get-suggestions` - Get address suggestions

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.