# ♠️ Poker Royale 
A real-time, multiplayer poker game built with React, Vite, Tailwind CSS, TypeScript, and boardgame.io.
Poker Royale is designed for quick matches with friends. The application enables users to create or join rooms, set their player names, and play poker in a visually engaging, browser-based environment.

---

## Table of Contents

- [Project Description](#project-description)
- [Installation and Run Instructions](#installation-and-run-instructions)
- [Design & Development Process](#design--development-process)
- [Unique Approaches & Methodologies](#unique-approaches--methodologies)
- [Trade-offs](#trade-offs)
- [Known Issues](#known-issues)
- [Tech Stack & Rationale](#tech-stack--rationale)


## Project Description

Poker Royale is a multiplayer web application where users can:
- Create or join poker rooms.
- Enter and store their names (via local storage).
- Experience real-time updates in the lobby and during gameplay.
- Enjoy a modern, visually-rich UI themed around luxury poker nights.

The app consists of a React + TypeScript client and a Node.js backend server powered by boardgame.io for real-time game logic and room management.

---

## Installation and Run Instructions

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/MarzhanOmarbekova/Poker.git
cd Poker
```

### 2. Start the Backend Server

```bash
cd server
npm install
npx ts-node server.ts
```
The backend runs on `http://localhost:8000` by default.

### 3. Start the Frontend Client

```bash
cd ../client
npm install
npm run dev
```
The client runs (by default) on `http://localhost:5173` or `http://localhost:3000` depending on your Vite setup.

---

## Design & Development Process

- **Component-based UI**: The client is structured with reusable React components for navigation, home, lobby, room creation, and joining.
- **Real-time Multiplayer Logic**: Used boardgame.io for server-side game state and lobby management, enabling low-latency real-time updates.
- **Styling**: Tailwind CSS is leveraged for rapid, consistent custom styling and background themes.
- **Persistent State**: Player names are persisted in `localStorage` for session continuity.
- **Navigation**: React Router is used for seamless transitions between pages (Home, Lobby, Join Room, etc.).

---

## Unique Approaches & Methodologies

- **Custom Theming**: Rich gold/velvet/wood backgrounds and Google Fonts create a casino-like, premium feel.
- **Modular Architecture**: Separation of concerns between client and server for better maintainability.
- **Minimal Onboarding**: Players can join and play with almost no friction—just pick a name and join a room.
- **Real-time Communication**: Utilization of boardgame.io's built-in WebSocket support to handle real-time interactions.

---

## Trade-offs

- **boardgame.io vs. Custom Implementation**: Chose boardgame.io for its robust game state management and real-time capabilities, which accelerates development but may introduce a learning curve.
- **Room Size Fixed**: The number of players per room is currently fixed and not user-configurable.
- **No Server Deployment Scripts**: The setup is local-only, and not ready for cloud deployment out-of-the-box.
- **Vite over Create React App**: Selected Vite for its faster build times and modern tooling support, which may require additional configuration for some libraries.


## Known Issues

- **Mobile Optimization**: While the UI is responsive, further testing is needed to ensure optimal performance on all devices.
- **Incomplete Game Logic**: The full poker game mechanics are still under development.
- **No Error Handling for Network Failures**:  Limited error handling for network failures and unexpected user actions.

---

## Tech Stack & Rationale

- **React & TypeScript**: Provides a robust framework for building scalable and maintainable user interfaces with type safety.

- **Vite**: Offers a fast and modern development environment with minimal configuration.

- **Tailwind CSS**: Enables rapid UI development with a utility-first approach, ensuring design consistency.

- **boardgame.io**: Simplifies the implementation of multiplayer game logic and real-time communication.

This stack was chosen for its speed of development, strong TypeScript support, and suitability for real-time browser games.

