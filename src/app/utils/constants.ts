import { environment } from '../../environments/environment';

export class Constants {
  public static RAPIDO_BUILD = 'Rapidobuild';
  public static CUSTOM = "custom:";
  public static POOL_DATA = {
    UserPoolId : environment.userPoolId,
    ClientId : environment.clientId
  }
  public static environment = {
    name: environment.name,
    production: environment.production,
    productSearchEndPoint: environment.productSearchEndPoint,
    version: environment.version,
    staticAssets: environment.staticAssets,
    stripePublicKey: environment.payment.publicKey
  }

  public static PROD_REDIRECT = "https://rapidobuild.com"

  public static RAPIDO_SESSION_ID = "rapido_session_id";
  public static RAPIDO_COOKIES_PERMISSION = "rapido_cookies_permission";

  public static DEFAULT_PHONE_CODE = "+44";
  public static INDIA_PHONE_CODE = "+91";
  public static DEFAULT_CURRENCY_CODE = "gbp";
  public static PHONE_NUMBER = "phone_number";
  public static EMAIL = "email";
  public static NAME = "name";
  public static CUSTOM_RAPIDO_ID = "custom:rapidoId";
  public static CUSTOM_ACCEPTED_T_AND_C = "custom:acceptedTAndC";
  public static CUSTOM_SEND_ME_PROMOTIONS = "custom:sendMePromotions";
  public static CUSTOM_COMM_VIA_EMAIL = "custom:commViaEmail";
  public static CUSTOM_COMM_VIA_SMS = "custom:commViaSMS";
  public static CUSTOM_PERSONALISATION = "custom:personalisation";

  public static NO_MOBILE_NUMBER = "Please enter mobile number";
  public static NO_PASSWORD = "Please enter password";
  public static INVALID_MOBILE_NUMBER = "Not a valid number";
  public static PASSWORD_CHANGED_SUCCESS_MESSAGE = "Password Changed successfully ";
  public static NO_COUNTRY_CODE = "Please enter country code";
  
  public static SUCCESSFUL_REGISTRATION = "User successfully registered!";

  public static ERROR_RESEND_CONFIRMATIONN_CODE = "Error while resending confirmation code";
  public static SUCCESS_RESEND_CONFIRMATION_CODE = "Successfully resent confirmation code!";

  public static ERROR_CONFIRMING_REGISTRATION = "Error while confirming registration";
  public static SUCCESS_CONFIRMING_REGISTRATION = "Successfully confirmed registration!";
  public static PASSWORD_MISMATCH_ERROR = "Password and confirm password mismatched";
  // Top Nav Bar
  public static ERROR_SIGN_IN = "Error signning you in";
  public static SUCCESS_SIGN_IN = "Logged in successfully!";
  public static LOGGED_IN_AS = "Logged In As";

  public static SESSION_RETRIEVED = "Session retrieved!";
  public static SESSION_NOT_FOUND = "Session not found";

  public static SUCCESSFULLY_UPDATED_ATTRIBUTES = "Sussfully updated attributes!";

  public static PASSWORD_CHANGE_SUCCESS = "Password sucessfully changed!";
  public static FORGOT_PASSWORD_SUCCESS = "Password successfully reset!";

  public static INPUT_VERIFICATION_CODE = "Please input verification code ";
  public static ENTER_NEW_PASSWORD = "Enter new password";

  public static SUCCESSFULLY_DELETED_USER = "Deleted user successfully";

  public static RETRY_TIMES = 2;

  public static PRODUCT_HIERARCHY = "/api-data/product-hierarchy.json";

  public static SEARCH_QUERY = {
    term: "(term field=_id $)",
    openBracketOr: "(or",
    closeBracket: ")",
    cartReturnFields: ["price", "name", "images", "currency", "offer"].join(","),
    orderReturnFields: ["name", "images", "currency"].join(","),
    structuredParser: "structured"
  }

  public static CUSTOMER_APIS = environment.customer
  public static PAYMENT_APIS = environment.payment
  public static CART_APIS = environment.cart
  public static ORDERS_APIS = environment.orders
  public static RATINGS_APIS = environment.ratings
  public static GUESTS_APIS = environment.guests

  public static ADDRESS_TYPES = [
    {
      key: "Delivery",
      value: 1
    }
  ]

  public static ORDER_STATUS = {
    "1": "Incomplete",
    "2": "Paid",
    "3": "Delivered",
    "4": "Cancelled",
    "5": "Returned"
  }

  public static COUNTRY_CODES = {
    "1": "United Kingdom"
  }

  public static MOBILE_CONFIG = {
    image: true,
    price: true,
    itemsInTemplate: 1,
    scroll: true,
    title: true,
    offer: true,
    desc: true
  }

  public static TABLET_CONFIG = {
    image: true,
    price: true,
    itemsInTemplate: 3,
    scroll: true,
    title: true,
    offer: true,
    desc: true
  }

  public static DESKTOP_CONFIG = {
    image: true,
    price: true,
    itemsInTemplate: 5,
    scroll: true,
    title: true,
    offer: true,
    desc: true
  }

  public static ITEM_MOVED_TO_CART = "Item has been moved to cart";
  public static ITWM_DELETE_CART = "Item has been deleted !";
  public static ITWM_SAVE_LATER = "Item has been saved for later";
  public static SESSION_LOST = "Login Session doesn't exist";
  public static ORDER_QUANTITY_ERROR = "Order quantity can't be less than one";
  public static EXCEEDED_ORDER_QUANTITY_ERROR = "Order quantity can't be more than 100";
  public static MIN_ORDER_PRICE_FOR_FREE_DELIVERY = 300;
  public static FREE_DELIVERY_MESSAGE = "Your order is eligible for FREE Delivery."
  public static SELECT_FREE_DELIVERY_AT_CHECKOUT = "Select this option at checkout."
  public static CART_DISCLAIMER = "The price and availability of items at Rapidobuild.com are subject to change.The shopping cart is a temporary place to store a list of your items and reflects each item's most recent price. Do you have a promotional code? We'll ask you to enter your claim code when it's time to pay."

  public static COMPANY_DETAILS_ADDED = "Company Details has been added"
  public static COMPANY_DETAILS_UPDATED = "Company Details has been updated"

  public static REVIEW_ADDED_SUCCESSFULLY = "Review added successfully"
  public static REVIEW_DELETED_SUCCESSFULLY = "Review deleted successfully"
  public static REVIEW_UPDATED_SUCCESSFULLY = "Review updated successfully"
  public static REVIEW_DEACTIVATED_SUCCESSFULLY = "Review deactivated"
  public static REVIEW_HELPFUL_INCREMENT = "You found the review helpful"
  public static UNAUTHORIZED_REVIEW_CREATE = "You can only add a review only when you purchase the product and its delivered to you"

  public static DELIVERY_DATE_INTERVAL = "Your order will be delivered in 3 to 5 business days."

  // Home component
  public static RECOMMENDEDLIST_TITLE = "Recommended Products"
  public static FREQUENTLY_BOUGHT_TITLE = "Frequently Bought Products"
  public static BROWSING_HISTORY_TITLE = "Previously Browsed Products"
  public static NEWLY_ADDED_PRODUCTS_TITLE = "Newly Added Product"
  public static FREQUENTLY_BOUGHT_BY_ME_TITLE = "Frequently Bought by Me"
}
