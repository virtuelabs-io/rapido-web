import { Order } from './order';

let orders = {
    orderItemsObject: {
        13: {
            1: {
                addr_1: "K 004 , Bren Trillium Apartments",
                addr_2: "Hosur Rd, Electronic City",
                address_type_id: 1,
                city: "BENGALURU",
                country: "India",
                county: "KARNATAKA",
                created_on: "2019-08-31T10:33:59.000Z",
                delivery_address_id: 1,
                delivery_cost: 0,
                full_name: "Anirup Patnaik",
                id: 13,
                item_vat: 44.6,
                order_price: 222.99,
                order_price_total: 267.59,
                order_status_id: 2,
                postcode: "560100",
                product_id: 1,
                quantity: 1,
                total_price: 222.99,
                unit_price: 222.99,
                vat: 44.6
            }
        }
    },
    products: {
        1: {
            currency: "£",
            images: [
                "/images/products/1/image1.jpg",
                "/images/products/1/image1.jpg",
                "/images/products/1/image1.jpg",
                "/images/products/1/image1.jpg"
            ],
            name: "Samsung Galaxy Watch Active 40mm Silver"
        }
    }
}
export class OrdersMockData {

  public static orders = orders

  public static deleteOrder = {
    affectedRows: 1,
        changedRows: 0,
        fieldCount: 0,
        insertId: 0,
        message: "",
        protocol41: true,
        serverStatus: 2,
        warningCount: 0
    }

}




