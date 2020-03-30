export class AddressDetails {
  constructor(
    private _full_name: string,
    private _address_type_id: number,
    private _addr_1: string,
    private _city: string,
    private _county: string,
    private _country: string,
    private _postcode: string,
    private _addr_2?: string,
    private _customer_id?: string,
    private _id?: number
  ) {}

  set full_name(full_name: string) {
    this._full_name = full_name;
  }

  get full_name() {
    return this._full_name;
  }

  set address_type_id(address_type_id: number) {
    this._address_type_id = address_type_id;
  }

  get address_type_id() {
    return this._address_type_id;
  }

  set addr_1(addr_1: string) {
    this._addr_1 = addr_1;
  }

  get addr_1() {
    return this._addr_1;
  }

  set city(city: string) {
    this._city = city;
  }

  get city() {
    return this._city;
  }

  set county(county: string) {
    this._county = county;
  }

  get county() {
    return this._country;
  }

  set country(country: string) {
    this._country = country;
  }

  get country() {
    return this._country;
  }

  set postcode(postcode: string) {
    this._postcode = postcode;
  }

  get postcode() {
    return this._postcode;
  }

  set addr_2(addr_2: string) {
    this._addr_2 = addr_2;
  }

  get addr_2() {
    return this._addr_2;
  }

  set customer_id(customer_id: string) {
    this._customer_id = customer_id;
  }

  get customer_id() {
    return this._customer_id;
  }

  set id(id: number) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  toJSON() {
    return {
      full_name: this._full_name,
      address_type_id: this._address_type_id,
      addr_1: this._addr_1,
      city: this._city,
      county: this._county,
      country: this._country,
      postcode: this._postcode,
      addr_2: this._addr_2,
      customer_id: this._customer_id,
      id: this._id
    };
  }
}
