const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');
const errorHandler = require('./middleware/error');
// require('dotenv').config({path: './config/config.env'})

// Load env vars
dotenv.config({ path: './config/config.env' });
// Connect to DB
connectDB().then();

// Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');



const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// File uploading
app.use(fileUpload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use(errorHandler);

const PORT = process.env.PORT || 5080;

const server = app.listen(
	PORT, () => {
		console.log(
			colors.yellow.bold(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
		)
	}

);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(colors.red(`Error: ${err.message}`));
	// Close server & exit process
	server.close(() => process.exit(1));
});
