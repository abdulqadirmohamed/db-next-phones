const { pool } = require("../models/db");

const salesController = {
    getAll: async (req, res) => {
        try {
            const [rows] = await pool.query("SELECT * FROM sales");
            res.json({
                data: rows
            });
        } catch (error) {
            console.error('Error fetching sales:', error);
            res.status(500).json({
                status: "error",
                message: "An error occurred while fetching sales."
            });
        }
    },
    getSaleById: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await pool.query("SELECT * FROM sales WHERE id = ?", [id]);
            res.json({
                data: rows
            });
        } catch (error) {
            console.error('Error fetching sale:', error);
            res.status(500).json({
                status: "error",
                message: "An error occurred while fetching sale."
            });
        }
    },
    create: async (req, res) => {
        try {
            const { customer_id, product_id, quantity, total_amount } = req.body;
            const sql = "INSERT INTO sales(customer_id , product_id , quantity, total_amount) VALUES(?,?,?,?)";
            const [rows] = await pool.query(sql, [customer_id, product_id, quantity, total_amount]);
            res.json({ data: rows })
        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        try {
            const { customer_id, product_id, quantity, total_amount } = req.body;
            const { id } = req.params;
            const sql = "UPDATE sales SET customer_id = ?, product_id = ?, quantity = ?, total_amount = ? WHERE id = ?";
            const [rows] = await pool.query(sql, [customer_id, product_id, quantity, total_amount, id]);
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
            const [rows] = await pool.query("DELETE FROM sales WHERE id = ?", [id]);
            res.json({
                data: rows
            })
            console.log('deleted sales')

        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }
}

module.exports = salesController