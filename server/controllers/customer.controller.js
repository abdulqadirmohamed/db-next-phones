const { pool } = require("../models/db");

const customerController = {
    
    getAll: async (req, res) => {
        try {
            const [rows] = await pool.query("SELECT * FROM customers");
            res.json({
                data: rows
            });
        } catch (error) {
            console.error('Error fetching customers:', error);
            res.status(500).json({
                status: "error",
                message: "An error occurred while fetching customers."
            });
        }
    },
    getProductById: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await pool.query("SELECT * FROM customers WHERE id = ?", [id]);
            res.json({
                data: rows
            });
        } catch (error) {
            console.error('Error fetching customers:', error);
            res.status(500).json({
                status: "error",
                message: "An error occurred while fetching product."
            });
        }
    },
    create: async (req, res) => {
        try {
            const { name, phone, address } = req.body;
            const sql = "INSERT INTO customers(name, phone, address) VALUES(?,?,?)";
            const [rows] = await pool.query(sql, [name, phone, address]);
            res.json({ data: rows })
        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        try {
            const { name, phone, address } = req.body;
            const { id } = req.params;
            const sql = "UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?";
            const [rows] = await pool.query(sql, [name, phone, address, id]);
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
        }
    },
    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await pool.query("DELETE FROM customers WHERE id = ?", [id]);
            res.json({
                data: rows
            })

        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    
    totalCustomers: async (req, res) => {
        try {
            const [rows] = await pool.query("SELECT COUNT(*) AS total FROM customers");
            res.json({
                totalCustomers: rows[0].total
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
            status: "error",
            message: "Database query failed"
        });
        }
    }


};

module.exports = customerController;
