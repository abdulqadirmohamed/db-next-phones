export class Sales {
    id?: number
    customer_id: number
    sale_date: string
    items: Item[]


    constructor() {
        this.id = 0
        this.customer_id = 0
        this.sale_date = ""
        this.items = []
    }
}

export interface Item {
    product_id: number
    quantity: number
    total_amount: number
}