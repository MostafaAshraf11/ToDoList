const bcrypt = require('bcrypt');
const User = require('../models/UserSchema'); 
const jwt = require("jsonwebtoken");



async function register(req, res) {
    try {
        const { name, phoneNumber,password } = req.body;
        const email = req.body.email.toLowerCase();

        if (!name || !email || !phoneNumber || !password) {
            return res.status(400).json({ message: 'Missing required fields: name, email, or phone number or password' });
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = new User({ name, email, phoneNumber, password:hash });
        await user.save();

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                password: user.password,
                toDoList: user.toDoList,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

async function login(req, res) {
    try {
        const password = req.body.password;
        const email = req.body.email.toLowerCase();

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Password is incorrect ' });
        };
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1m' });
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                toDoList: user.toDoList,
            }});
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


async function getUserByEmail(req, res) {
    try {
        const email = req.query.email;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by email:', error);
        res.status(500).json({
            message: 'Error fetching user',
            error: error.message || 'Unknown error occurred',
        });
    }
}

async function updateUser(req, res) {
    try {
        const { name, email, phoneNumber } = req.body;
        const id = req.query.id;

        if(email){
            const exists = await User.findOne({ email });
            if (exists) {
                return res.status(400).json({ message: 'User already exists' });
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,{ name, email, phoneNumber },{ new: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            message: 'Error updating user',
            error: error.message || 'Unknown error occurred',
        });
    }
}

async function deleteUser(req, res) {
    try {
        const id = req.query.id;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User deleted successfully',
            user: user,
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            message: 'Error deleting user',
            error: error.message || 'Unknown error occurred',
        });
    }
}




module.exports = {
    register,
    getUserByEmail,
    updateUser,
    deleteUser,
    login
};