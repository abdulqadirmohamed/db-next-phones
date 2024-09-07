const { pool } = require("../models/db");

const productController = {
    getAll: async (req, res) => {
        try {
            const [rows] = await pool.query("SELECT * FROM products");
            res.json({
                data: rows
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({
                status: "error",
                message: "An error occurred while fetching products."
            });
        }
    },
    getProductById: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
            res.json({
                data: rows
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({
                status: "error",
                message: "An error occurred while fetching product."
            });
        }
    },
    create: async (req, res) => {
        try {
            const { name, description, price, stock_quantity, category } = req.body;
            const sql = "INSERT INTO products(name, description, price, stock_quantity, category) VALUES(?,?,?,?,?)";
            const [rows] = await pool.query(sql, [name, description, price, stock_quantity, category]);
            res.json({ data: rows })
        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        try {
            const { name, description, price, stock_quantity, category } = req.body;
            const { id } = req.params;
            const sql = "UPDATE products SET name = ?, description = ?, price = ?, stock_quantity = ?, category = ? WHERE id = ?";
            const [rows] = await pool.query(sql, [name, description, price, stock_quantity, category, id]);
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
            const [rows] = await pool.query("DELETE FROM products WHERE id = ?", [id]);
            res.json({
                data: rows
            })

        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }
};

module.exports = productController;
