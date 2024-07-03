const AdminModel = require('../model/AdminModel');
// this for me 
const createAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newAdmin = new AdminModel({ username, password });
        const savedAdmin = await newAdmin.save();
        res.status(201).json(savedAdmin);
    } catch (err) {
        console.error('Failed to create admin', err);
        res.status(500).json({ error: 'Failed to create admin' });
    }
};
const getAllAdmin = async (req, res) => {
    try {
        const admins = await AdminModel.find({});
        res.status(200).json(admins);
    } catch (err) {
        console.error('Failed to fetch admins', err);
        res.status(500).json({ error: 'Failed to fetch admins' });
    }
};


module.exports = {
    createAdmin,
    getAllAdmin,
};
