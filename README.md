# Kaizntree Inventory Management System

Kaizntree Inventory Management System is a full-stack application that allows users to manage a comprehensive list of inventory items through a user-friendly interface. The back end is built with Django REST Framework, and the front end is a React application.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before running the application, make sure you have the following installed:

- Python 3.8 or higher
- pip (Python package installer)
- Node.js
- npm (Node package manager)
- Git

### Installing

Follow these steps to get your development environment running:

1. Clone the repository from GitHub:

    ```sh
    git clone https://github.com/smellycattt/kaizntree.git
    cd kaizntree
    ```

2. Set up the virtual environment and install dependencies for the Django backend:

    ```sh

    # Create a virtual environment
    python -m venv venv

    # Activate the virtual environment
    # On Windows, use `venv\Scripts\activate`
    source venv/bin/activate

    # Install the dependencies
    pip install -r requirements.txt
    ```

3. Run migrations and start the Django development server:

    ```sh
    python manage.py migrate
    python manage.py runserver
    ```

    The backend API should now be running on `http://localhost:8000/`.

4. In a new terminal, navigate to the frontend directory and install dependencies for the React application:

    ```sh
    # Navigate to the frontend directory from the project root
    cd frontend

    # Install the dependencies
    npm install
    ```

5. Start the React development server:

    ```sh
    npm start
    ```

    The frontend should now be running on `http://localhost:3000/`.

### Running the tests

To run the automated tests for the backend:

```sh
# Ensure you are in the backend directory and the virtual environment is activated
python manage.py test
