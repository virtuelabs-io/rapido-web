import { AddressDetails } from "./address-details"

export class AddressDetailsMockData {
  public static addressList: AddressDetails[] = [
    new AddressDetails(
      "Full name",
      1,
      "addr_1",
      "city",
      "county",
      "country",
      "postcode",
      "addr_2"
    ),
  ]

  public static address: AddressDetails = new AddressDetails(
    "Full name",
    1,
    "addr_1",
    "city",
    "county",
    "country",
    "postcode",
    "addr_2"
  )

  public static postAddress = {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 7,
    serverStatus: 2,
    warningCount: 0,
    message: "",
    protocol41: true,
    changedRows: 0,
  }

  public static putAddress = {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    serverStatus: 2,
    warningCount: 0,
    message: "(Rows matched: 1  Changed: 1  Warnings: 0",
    protocol41: true,
    changedRows: 1,
  }

  public static deleteAddress = {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    serverStatus: 2,
    warningCount: 0,
    message: "",
    protocol41: true,
    changedRows: 0,
  }
}
