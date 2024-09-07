const { pool } = require("../models/db");

const debtController = {
    getAll: async (req, res) => {
        try {
            const [rows] = await pool.query("SELECT * FROM debts");
            res.json({
                data: rows
            });
        } catch (error) {
            console.error('Error fetching debt:', error);
            res.status(500).json({
                status: "error",
                message: "An error occurred while fetching debt."
            });
        }
    },
    create: async (req, res) => {
        try {
            const { customer_id, sale_id, outstanding_amount, due_date } = req.body;
            const sql = "INSERT INTO debts(customer_id , sale_id , outstanding_amount, due_date) VALUES(?,?,?,?)";
            const [rows] = await pool.query(sql, [customer_id, sale_id, outstanding_amount, due_date]);
            res.json({ data: rows })
        } catch (error) {
            console.log(error)
        }
    },
    getDebtById: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await pool.query("SELECT * FROM debts WHERE id = ?", [id]);
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
            const { customer_id, sale_id, outstanding_amount, due_date } = req.body;
            const { id } = req.params;
            const sql = "UPDATE debts SET customer_id = ?, sale_id = ?, outstanding_amount = ?, due_date = ? WHERE id = ?";
            const [rows] = await pool.query(sql, [customer_id, sale_id, outstanding_amount, due_date, id]);
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
        }
    }
    
}

module.exports = debtController