export class Product {
    id: number
    name: string
    description: string
    price: number
    stock_quantity: number
    category: string
    created_at: string

    constructor() {
        this.id = 0
        this.name = ''
        this.description = ''
        this.price = 0
        this.stock_quantity = 0
        this.category = ''
        this.created_at = ''
    }
}