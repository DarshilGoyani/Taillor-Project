const Customer = require('../models/Customer');

// ➕ Add Customer
exports.addCustomer = async (req, res) => {
    const customer = await Customer.create(req.body);
    res.json(customer);
};

// 📥 Get All Customers
exports.getCustomers = async (req, res) => {
    const customers = await Customer.find();
    res.json(customers);
};

// 📄 Get One Customer
exports.getCustomer = async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    res.json(customer);
};

// ✏️ Update Customer
exports.updateCustomer = async (req, res) => {
    await Customer.findByIdAndUpdate(req.params.id, req.body);
    res.json({ msg: "Customer updated" });
};

// 🗑 Delete Customer
exports.deleteCustomer = async (req, res) => {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ msg: "Customer deleted" });
};
