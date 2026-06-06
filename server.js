require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const { auth, requiresAuth } = require('express-openid-connect');

const routes = require("./routes");
const swaggerSpec = require("./swagger");
const { connectToDatabase } = require("./models/database");

const app = express();
const port = process.env.PORT || 3000;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SESSION_SECRET,
  baseURL: process.env.BASE_URL || `http://localhost:${port}`,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

app.use(express.json());

app.use(auth(config));

app.get('/auth-status', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Commenting out for now
// app.use("/books", requiresAuth()); 

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", routes);

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to start the server.", error);
    process.exit(1);
  }
}

startServer();