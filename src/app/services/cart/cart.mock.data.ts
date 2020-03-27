import { CartItem } from './cart-item';
import { CartItemDetails } from './cart-item-details';

let cartItem = new CartItem()
cartItem.in_cart = true
cartItem.product_id = 1
cartItem.quantity = 2
let itemDetails = {
    currency: "£",
    images: [
        "/images/products/31/31-shirt1.jpg",
        "/images/products/31/31-shirt1.jpg",
        "/images/products/31/31-shirt1.jpg",
        "/images/products/31/31-shirt1.jpg"
    ],
    name: "MUFALI Men's Cotton Blend Regular Fit Scoop Neck Full Sleeve Casual Wear T-Shirt",
    offer: "0.2",
    price: "16499.0"
}
let cartItemDetails = new CartItemDetails(
    cartItem,
    itemDetails
)
export class CartMockData {

    public static getCartItems: CartItemDetails[] = [
        cartItemDetails
    ]

    public static getCartItem: CartItem = cartItem
    

    public static cartCount: number = 5

    public static getSavedForLater: CartItem[] = [
        cartItem
    ]

    public static postCartItemList = {
        affectedRows: 1,
        changedRows: 0,
        fieldCount: 0,
        insertId: 0,
        message: "",
        protocol41: true,
        serverStatus: 2,
        warningCount: 0
    }

    public static postCartItem = {
        affectedRows: 1,
        changedRows: 0,
        fieldCount: 0,
        insertId: 0,
        message: "",
        protocol41: true,
        serverStatus: 2,
        warningCount: 0
    }

    public static deleteCartItem = {
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