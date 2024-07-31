const { default: mongoose } = require("mongoose");

const databaseConnection = () => {
    mongoose.connect("mongodb://localhost:27017/e-commerce", {
        serverSelectionTimeoutMS: 5000
    });

    mongoose.connection.on("connected", () => {
        console.log("Connected to mongo");
    });

    mongoose.connection.on("error", (error) => {
        console.log("Failed to connect", error);
    });
};

module.exports = databaseConnection;