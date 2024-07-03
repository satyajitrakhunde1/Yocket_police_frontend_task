# Cop and Fugitive Game

## Introduction

This is a simulation game where a player selects cities and vehicles for cops to capture a fugitive. The game is built using react.js for the frontend and Node.js for the backend. The frontend provides an interactive interface for selecting cities and vehicles, while the backend handles the logic for simulating the fugitive's location and the cops' pursuit.

## Assumptions

1. **Game Scope**: The game is a simulation and does not include real-time multiplayer functionality.
2. **City and Vehicle Selection**: The user can select from a predefined list of cities and vehicles.
3. **Fugitive Movement**: The fugitive's movement is simulated based on random selections or predefined paths.
4. **Frontend and Backend Communication**: Communication between the frontend and backend is handled via REST API endpoints.
5. 
### Frontend Setup

1. **Navigate to the frontend directory**:
    ```sh
    cd frontend
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Start the frontend development server**:
    ```sh
    npm start
    ```
    The frontend application will be available at `http://localhost:3000`. and `https://police-frontend.vercel.app/`

## Usage

1. Open the frontend application in your browser.
2. Select a city and vehicle for the cops.
3. Click the "Start Simulation" button to begin the game.
4. The backend will simulate the fugitive's movement and determine if the cops capture the fugitive.


