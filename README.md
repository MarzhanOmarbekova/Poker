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
- **Minimal Onboarding**: Players can join and play with almost no friction—just pick a name and join a room.

---

## Trade-offs

- **No Authentication**: There’s no persistent user authentication; name is stored in local storage only, which is insecure for production.
- **Room Size Fixed**: The number of players per room is currently fixed and not user-configurable.
- **No Server Deployment Scripts**: The setup is local-only, and not ready for cloud deployment out-of-the-box.


## Known Issues

- **No Production Deployment**: The application is intended for local use and not yet setup for public hosting.
- **No Bot Players**: Only human players are supported.
- **No Error Handling for Network Failures**: Unreliable network connections may cause players to be dropped from rooms.

---

## Tech Stack & Rationale

- **TypeScript & React**: For robust, type-safe frontend development and rapid UI iteration.
- **Vite**: Fast frontend build tool and dev server.
- **Tailwind CSS**: Utility-first CSS for rapid, themeable design.
- **boardgame.io**: Simplifies multiplayer game logic and synchronization.
- **Node.js (Backend)**: Familiar, fast setup for prototyping real-time APIs.

This stack was chosen for its speed of development, strong TypeScript support, and suitability for real-time browser games.

