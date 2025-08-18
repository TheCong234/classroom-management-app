# Classroom Management App
## Challenge: classroom-management-app using Node.js + Express for the backend, React + Tailwind CSS for the frontend, and Firebase as the database.

I divided the project into two main folders:
1. FE (Frontend source)
2. BE (Backend source)

## How to run the project:

### 1. Setup environment variables for BE
- For security, you need to create values in the .env file of the BE according to the template .env.example

### 2. Initialize Firebase manually
- In Firebase, create a collection named **users** with a document **0397318957** containing the following fields:
+ "role": "instructor"
+ "name": "Mr.Skipli"

### 3. Run the frontend (FE):

cd FE/
npm install
npm run dev

### 4. Run the backend (BE):

cd BE/
npm install
npm start

### 5. Access the app at:
http://localhost:5173/signin

# Implemented Features
🔐 Authentication & Security

Store all information in Firebase

Login using phone number and receive an access code via SMS

Verify access codes

Redirect users based on account role

Save logged-in phone number in localStorage

Protect routes according to user roles

👨‍🏫 Instructor Features

Add, edit, and delete students

Input validation included

Send access links to students via email

Assign lessons to students

View the list of students and their details

Real-time one-on-one chat with students (via Socket.io)

👨‍🎓 Student Features

View assigned lessons

Mark lessons as completed

Real-time one-on-one chat with instructors (via Socket.io)
