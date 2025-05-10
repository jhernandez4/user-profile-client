## Frontend Set Up & Installation
1. Clone the repository
```bash
git clone https://github.com/jhernandez4/user-profile-client.git
cd user-profile-client
```

2. Create an `.env` file
* In the root of your directory, create a file named `.env`
* Add the following line to the \`.env\` file to specify your backend URL:
```bash
VITE_BACKEND_URL="http://127.0.0.1:8000"
```

3. Install the dependencies and run in development mode
```bash
npm install
npm run dev
```