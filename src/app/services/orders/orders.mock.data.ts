import { Order } from './order'

let frequentlyBoughtData = new Order()
frequentlyBoughtData.product_id = 75
frequentlyBoughtData.frequency = 1

let frequentlyBoughtByMeData = new Order()
frequentlyBoughtByMeData.product_id = 75
frequentlyBoughtByMeData.frequency = 1

let orders = {
  orderItemsObject: {
    13: {
      1: {
        addr_1: 'K 004 , Bren Trillium Apartments',
        addr_2: 'Hosur Rd, Electronic City',
        address_type_id: 1,
        city: 'BENGALURU',
        country: 'India',
        county: 'KARNATAKA',
        created_on: '2019-08-31T10:33:59.000Z',
        delivery_address_id: 1,
        delivery_cost: 0,
        full_name: 'Anirup Patnaik',
        id: 13,
        item_vat: 44.6,
        order_price: 222.99,
        order_price_total: 267.59,
        order_status_id: 2,
        postcode: '560100',
        product_id: 1,
        quantity: 1,
        total_price: 222.99,
        unit_price: 222.99,
        vat: 44.6,
      },
    },
  },
  products: {
    1: {
      currency: '£',
      images: [
        '/images/products/1/image1.jpg',
        '/images/products/1/image1.jpg',
        '/images/products/1/image1.jpg',
        '/images/products/1/image1.jpg',
      ],
      name: 'Samsung Galaxy Watch Active 40mm Silver',
    },
  },
}

let orderDetail = {
  orderItemsObject: {
    17: {
      35: {
        addr_1: '46 Broadway',
        addr_2: 'Address Line 2',
        address_type_id: 1,
        city: 'Pontypridd',
        country: 'United Kingdom',
        county: 'KA County',
        created_on: '2019-08-31T17:05:58.000Z',
        delivery_address_id: 6,
        delivery_cost: 0,
        full_name: 'Sangram Reddy',
        id: 17,
        item_vat: 299.8,
        order_price: 1499,
        order_price_total: 1798.8,
        order_status_id: 2,
        postcode: 'CF37 1BD',
        product_id: 35,
        quantity: 1,
        total_price: 1499,
        unit_price: 1499,
        vat: 299.8,
      },
    },
  },
  products: {
    35: {
      currency: '£',
      images: [
        '/images/products/1/image1.jpg',
        '/images/products/1/image1.jpg',
        '/images/products/1/image1.jpg',
        '/images/products/1/image1.jpg',
      ],
      name: 'Samsung Galaxy Watch Active 40mm Silver',
    },
  },
}

export class OrdersMockData {
  public static orders = orders

  public static orderDetail = orderDetail

  public static frequentlyBoughtSet = frequentlyBoughtData

  public static frequentlyBoughtByMeSet = frequentlyBoughtByMeData

  public static deleteOrder = {
    affectedRows: 1,
    changedRows: 0,
    fieldCount: 0,
    insertId: 0,
    message: '',
    protocol41: true,
    serverStatus: 2,
    warningCount: 0,
  }

  public static postCartItemList = {
    affectedRows: 1,
    changedRows: 0,
    fieldCount: 0,
    insertId: 0,
    message: '',
    protocol41: true,
    serverStatus: 2,
    warningCount: 0,
  }
}
