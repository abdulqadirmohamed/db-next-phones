const express = require('express')
const productRouter = require('./routes/product.routes')
const customerRouter = require('./routes/customer.routes')
const salesRouter = require('./routes/sales.routes')
const debtRouter = require('./routes/debt.routes')
const paymetRouter = require('./routes/payment.routes')
const authRouter = require('./routes/auth.routes')
const app = express()


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/products', productRouter);
app.use('/api/customers', customerRouter);
app.use('/api/sales', salesRouter);
app.use('/api/debts', debtRouter);

app.use('/api/payments', paymetRouter);

app.use('/api/auth', authRouter)


app.listen(3000, () => {
    console.log('server running')
})