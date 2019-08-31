import { CartItem } from './cart-item';

let cartItem = new CartItem()
cartItem.in_cart = true
cartItem.product_id = 1
cartItem.quantity = 2
export class CartMockData {

    public static getCartItems: CartItem[] = [
        cartItem
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



