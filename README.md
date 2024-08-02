#Installation and Setup for Restaurant Application(MERN)
1. Install VS Code(we did this in VS code since it is user friendly and understandable)
Download: After installing VScode open folder of the restaurant app from the file

##Install npm, nodejs,

##install react

We can install node from the official website. Using the terminal. After installing verify using
node -v.

To install react make sure to run the command “npm install -g react-app”.

The ExpressJS runs on npm installer. Initialize a nodejs project and run “npm install express”.

##2. Install MongoDB

Download: Visit the official MongoDB website
(https://www.mongodb.com/try/download/community)

- Installation: Continue with screen instructions
- Start MongoDB: Once installed, start the MongoDB service. 

##3. Create a Stripe Account

- Visit the Stripe website (https://stripe.com/) and sign up for a new account.
- Follow the on-screen instructions to complete the account creation process. You will need your
Stripe secret key later.

##4. Set Up the Frontend

- Navigate to Frontend: Open the project directory and navigate to the 'frontend' folder.
- Install Dependencies: Open the terminal in VSCode and run the following command:
 Bash

 'npm install'
- Start Development Server: Run the following command to start the frontend development
server:

The frontend application should now be accessible at 'http://localhost:5173'.
Terminal:
 'npm run dev'

### 6. Set Up the Backend
- Navigate to Backend: ‘npm install’
cd restaurant-app, cd backend .

- Install Dependencies: Open the terminal in VSCode and run the following command:
- Start Development Server: Run the following command to start the backend development
server:

'npm run dev'
### 7. Connect to MongoDB

- Once the backend server is running, you should see a message in the console indicating
whether it has connected to MongoDB successfully.

- Connected to MongoDB:If this message appears, the backend is successfully connected
to your MongoDB database.

 - No message: If there's no message or an error, check your MongoDB connection settings
in the backend code.

## 8. Replace Stripe Secret Key
- Open the backend code and locate the file where the Stripe secret key is stored (usually a
configuration file or environment variable).
- Replace the placeholder value with your actual Stripe secret key.
By following these steps, we have a MERN stack(restaurant-app) application running locally.
