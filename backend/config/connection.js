const mongoose = require("mongoose");


const connectDB = async () => {
    try {
        const cnn = await mongoose.connect(process.env.MONGOURI)
        console.log(`mongodb Connected.. host${cnn.connection.host}`);
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectDB