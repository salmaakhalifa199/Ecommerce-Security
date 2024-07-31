const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const signUpRouter = require('./src/routes/signupRoute');
const loginRouter = require('./src/routes/loginRoute');
const categoryRoute = require('./src/routes/categoryRoute');
const productRoute = require('./src/routes/productRoute');
const PaymentRoute = require('./src/routes/PaymentRoute');
const orderRoute = require('./src/routes/orderRoute')
const cartRoute = require('./src/routes/cartRoute');
const { createAdmin } = require('./src/scripts/setup');
const { SESSION_KEY } = require("./src/configuration/sessionConfig");
const databaseConnection = require("./src/configuration/dbConfig");
const session = require("express-session");
const cors = require('cors');
dotenv.config({ path: 'config.env' });



databaseConnection();

const app = express();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`mode: ${process.env.NODE_ENV}`);
}

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(
    session({
        secret: SESSION_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: {
            domain: 'localhost',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        }
    }));

createAdmin();
app.use(bodyParser.json());

app.use("/user", signUpRouter);
app.use("/auth", loginRouter);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/payment", PaymentRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
});