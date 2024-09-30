const { pool } = require("../models/db");

const salesController = {
  getAll: async (req, res) => {
    try {
      //Select customers.name AS customer_name, products.name AS product_name, sales.quantity, sales.total_amount, sales.sale_date FROM sales JOIN customers JOIN products WHERE sales.customer_id = customers.id AND sales.product_id = products.id
      const [rows] = await pool.query(`
                SELECT 
                    s.id AS sale_id, s.sale_date, c.name AS customer_name, p.name AS product_name, si.quantity, si.total_amount
                FROM 
                    sales s
                JOIN 
                    customers c ON s.customer_id = c.id
                JOIN 
                    sales_items si ON s.id = si.sale_id
                JOIN 
                    products p ON si.product_id = p.id
                ORDER BY 
                    s.sale_date DESC;`);
      res.json({
        data: rows,
      });
    } catch (error) {
      console.error("Error fetching sales:", error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while fetching sales.",
      });
    }
  },
  getSaleById: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("SELECT * FROM sales WHERE id = ?", [id]);
      res.json({
        data: rows,
      });
    } catch (error) {
      console.error("Error fetching sale:", error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while fetching sale.",
      });
    }
  },

  create: async (req, res) => {
    try {
      const { customer_id, sale_date, items } = req.body;

      // Insert into the sales table (without products yet)
      const salesSql = `
      INSERT INTO sales (customer_id, sale_date, total_amount)
      VALUES (?, NOW(), ?)
    `;
      const [salesResult] = await pool.query(salesSql, [customer_id, 0]);

      // Get the inserted sale ID
      const saleId = salesResult.insertId;

      let totalSaleAmount = 0;

      // Insert each item into the sales_items table or directly into the sales table
      const salesItemsSql =
        "INSERT INTO sales_items (sale_id, product_id, quantity, total_amount) VALUES (?, ?, ?, ?)";

      for (const item of items) {
        const { product_id, quantity, total_amount } = item;
        totalSaleAmount += total_amount;
        await pool.query(salesItemsSql, [
          saleId,
          product_id,
          quantity,
          total_amount,
        ]);
      }

      // Update sales table with the correct total_amount
      const updateSalesQuery = `
    UPDATE sales
    SET total_amount = ?
    WHERE id = ?
  `;

  await pool.query(updateSalesQuery, [totalSaleAmount, saleId])

      // Respond with success
  
      res.json({ message: 'Sale created successfully', sale_id: saleId, total_amount: totalSaleAmount });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating sale", error });
    }
  },

  update: async (req, res) => {
    try {
      const { customer_id, product_id, quantity, total_amount } = req.body;
      const { id } = req.params;
      const sql =
        "UPDATE sales SET customer_id = ?, product_id = ?, quantity = ?, total_amount = ? WHERE id = ?";
      const [rows] = await pool.query(sql, [
        customer_id,
        product_id,
        quantity,
        total_amount,
        id,
      ]);
      res.json({
        data: rows,
      });
    } catch (error) {
      console.log(error);
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("DELETE FROM sales WHERE id = ?", [id]);
      res.json({
        data: rows,
      });
      console.log("deleted sales");
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
      });
    }
  },

  totalSales: async (req, res) => {
    try {
      const [rows] = await pool.query(
        "SELECT SUM(total_amount) AS total FROM sales;"
      );
      const totalSales = rows[0].total;
      res.json({
        totalSales: totalSales,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "Database query failed",
      });
    }
  },
  totalSalesToday: async (req, res) => {
    try {
      const [rows] = await pool.query(
        "SELECT SUM(total_amount) AS total_sales_today FROM sales WHERE DATE(sale_date) = CURDATE()"
      );

      const totalSalesToday = rows[0].total_sales_today || 0;
      res.json({
        total_sales_today: totalSalesToday,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "Database query failed",
      });
    }
  },
};

module.exports = salesController;
