# Ride Booking System Simulator Frontend

The Ride Booking System Simulator Frontend is a mini weekend project I built to practice Kafka and WebSockets integration. This frontend is designed purely for simulation, allowing users to visualize real-time ride booking events. It interacts with a backend system that processes ride requests, assigns drivers, and updates ride statuses dynamically using Kafka's event-driven architecture. WebSockets enable seamless real-time updates, ensuring an interactive and responsive experience. This project helped me reinforce concepts like message streaming, real-time data flow, and state synchronization. Though not a full-fledged application, it serves as a practical hands-on implementation of these technologies.

## Live Demo

- [Link]() (coming soon)

## Features
1. **Real-Time Ride Updates**: Displays live ride status changes using WebSockets for instant updates.
2. **Kafka-Driven Event Processing**: Utilizes Apache Kafka to handle ride booking and status events.
3. **Simulated Driver Assignment**: Mimics driver allocation process based on ride requests dynamically.
4. **Seamless Backend Communication**: Connects with the backend efficiently to fetch and update data.
5. **Interactive UI Simulation**: Provides a frontend interface to visualize ride booking workflows.

## Screenshots

###### Users
![Users](https://dhairya-singla-baat-cheet-images.s3.ap-south-1.amazonaws.com/users.png)

## Installation & Setup Instructions

1. Clone the repository using the following command:
`git clone https://github.com/Dhairya2505/Ride-Booking-System-Simulator-Frontend.git`

2. Navigate to the project directory : ` cd Ride-Booking-System-Simulator-Frontend`

3. Install the dependencies : `npm install`

4. Start the development server : `npm run dev`

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Technologies Used

- **Programming Languages**: TypeScript
- **Frameworks**: Next.js
- **CSS**: Tailwind CSS
- **Libraries**: ws (websocket), axios, nanoid
