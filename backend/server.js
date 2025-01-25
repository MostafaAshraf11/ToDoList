const express = require('express');
const connectDB = require('./config/db'); 
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/UserRoutes');
const taskRoutes = require('./routes/TaskRoutes');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
connectDB();

const PORT = process.env.PORT || 5000;

app.use('/user', userRoutes);
app.use('/task', taskRoutes);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
