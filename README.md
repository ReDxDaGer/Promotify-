# Promotify

Promotify is an innovative application built using **Flask** for the backend and **Next.js** for the frontend. It serves as a platform to connect **sponsors** and **influencers** in a unique and seamless way, leveraging AI to enhance user experience.

## Key Features

- **Sponsor-Influencer Connection**: Facilitates efficient and direct interactions between sponsors and influencers.
- **AI-Powered Chatbot**: Integrated AI chatbot for providing assistance and support to users, ensuring smooth communication and quick resolutions.
- **Modern Tech Stack**:
  - **Flask**: Powers the backend APIs and business logic.
  - **Next.js**: Provides a sleek, responsive, and interactive user interface.
- **Innovative Matchmaking**: Matches sponsors and influencers based on preferences, needs, and profiles.

## Installation and Setup

Follow these steps to get Promotify up and running on your local system.

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- A virtual environment for Python (optional but recommended)

### Backend Setup (Flask)

1. Clone the repository and navigate to the backend directory:
   ```bash
   git clone <repository-url>
   cd promotify/backend
    ```

2. Creaye and activate a virtual environment:
    ```bash
    python -m venv env
    source env/bin/activate
    ```
3. Install the dependecies:
    ```bash
    pip install -r requirements.txt
    ```
4. Start the Flask server:
    ```bash
    python3 backend/main.py
    ```

### Frotend Setup (Next.js)

1. Navigate to the frotend directory:
    ```bash
    cd promotify/frontend
    ```
2. Install the dependencies:
    ```bash
    npm install 
    ```
3. Start the development server:
    ```bash
    npm run dev 
    ```

### Integration 

Ensure the backend and frontend are properly connected by updating API endpoints in the frontend configuration (e.g., .env.local).
