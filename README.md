## Frontend Set Up & Installation
**1. Clone the repository**
```bash
git clone https://github.com/jhernandez4/user-profile-client.git
cd user-profile-client
```

**2. Create an `.env` file**
* In the root of your directory, create a file named `.env`
* Add the following line to the `.env` file to specify your backend URL:
```bash
VITE_BACKEND_URL="http://127.0.0.1:8000"
```

**3. Install the dependencies and run in development mode**
```bash
npm install
npm run dev
```

**4. Make sure that the backend is running in a separate window to register, login, and edit your profile**
* The backend repository can be found here:
`https://github.com/jhernandez4/user-profile`