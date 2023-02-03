const mongoose = require('mongoose');
const {connect} = require('mongoose');

mongoose.set("strictQuery", false);

const connectDB = async () => {
	const conn = await connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
