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

  public static CUSTOMER_APIS = environment.customer
  public static PAYMENT_APIS = environment.payment

  public static ADDRESS_TYPES = [
    {
      key: "Delivery",
      value: 1
    }
  ]
}
