## MERN-Dashboard

Ett responsivt och säkert Dashboard-projekt byggt med MERN-stack (MongoDB, Express.js, React, Node.js). Applikationen innehåller autentisering, skyddade rutter, och statistik om försäljning och användare, med data hämtad från en MongoDB-backend via ett RESTful API.

## Funktioner:

Användarinloggning och registrering via auth-system

Protected Routes – endast åtkomst vid inloggning

Statistik & Analyser – försäljning och användarinfo

Responsiv design – anpassad för desktop, tablet och mobil

RESTful API med Express.js och Node.js

MongoDB används som databas

Light & darkmode.

## Teknikstack:

Frontend: React.js, React Router DOM, Axios, Context API

Backend: Node.js, Express.js

Databas: MongoDB + Mongoose

Autentisering: JWT (JSON Web Tokens) & bcrypt

Övrigt:

Protected routes

Miljövariabler med dotenv

Error handling middleware

## Installation:

git clone https://github.com/Burtarn/Dashboard
Frontend:
cd dashboard
npm install
npm run dev

Backend:
cd server
npm install
npm start

Skapa en .env
PORT=3000
SECRET_KEY=din-hemliga-nyckel
MONGO_URI=mongodb://localhost:27017/min-databas

## Säkerhet:

JWT används för autentisering och sessionshantering

Endast inloggade användare kan se skyddade sidor

API-endpoints valideras och skyddas

## Bild på dashboard


## API Endpoints:

GET: http://localhost:3000/api/statistics - statistik och datapunkter.
GET: http://localhost:3000/api/profiles - Se aktiva profiler.
POST:  /api/auth/login - Logga in användare.

## Kommande förbättringar:

Admin-panel för att hantera användare

Möjlighet att exportera statistik (t.ex. till CSV)











