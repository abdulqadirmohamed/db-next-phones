export class Sales {
    id: number
    customer_id: number
    product_id: number
    quantity: number
    total_amount: number
    sale_date: string
    name: string
    phone: string
    address: string
    description: any
    price: number
    stock_quantity: number
    category: string

    constructor() {
        this.id = 0,
            this.customer_id = 0,
            this.product_id = 0,
            this.quantity = 0,
            this.total_amount = 0,
            this.sale_date = "",
            this.name = "",
            this.phone = "",
            this.address = "",
            this.price = 0,
            this.stock_quantity = 0,
            this.category = ""

    }
}