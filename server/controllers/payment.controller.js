const { pool } = require("../models/db");

const paymentController = {
    getAll: async (req, res) => {
        try {
            const [rows] = await pool.query("SELECT * FROM payments");
            res.json({
                data: rows
            });
        } catch (error) {
            console.error('Error fetching payment:', error);
            res.status(500).json({
                status: "error",
                message: "An error occurred while fetching payment."
            });
        }
    },
    create: async (req, res) => {
        try {
            const { debt_id , payment_amount, payment_date } = req.body;
            const sql = "INSERT INTO payments(debt_id , payment_amount, payment_date) VALUES(?,?,?)";
            const [rows] = await pool.query(sql, [debt_id , payment_amount, payment_date]);
            res.json({ data: rows })
        } catch (error) {
            console.log(error)
        }
    },
    getPaymentsById: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await pool.query("SELECT * FROM payments WHERE id = ?", [id]);
            res.json({
                data: rows
            });
        } catch (error) {
            console.error('Error fetching debt:', error);
            res.status(500).json({
                status: "error",
                message: "An error occurred while fetching sale."
            });
        }
    },
    update: async (req, res) => {
        try {
            const { debt_id , payment_amount, payment_date } = req.body;
            const { id } = req.params;
            const sql = "UPDATE payments SET debt_id = ?, payment_amount = ?, payment_date = ? WHERE id = ?";
            const [rows] = await pool.query(sql, [debt_id , payment_amount, payment_date, id]);
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
        }
    }
    
}

module.exports = paymentController