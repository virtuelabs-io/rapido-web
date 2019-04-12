export class PaymentDetails {

  constructor(
    private _name_on_card: string,
    private _card_number: string,
    private _expirity_month: string,
    private _expirity_year: string,
    private _address_id: number,
    private _payment_type_id: number,
    private _customer_id?: string,
    private _id?: number
  ){}

  set name_on_card(name_on_card: string){
    this._name_on_card = name_on_card
  }

  get name_on_card(){
    return this._name_on_card
  }

  set expirity_month(expirity_month: string){
    this._expirity_month = expirity_month
  }

  get expirity_month(){
    return this._expirity_month
  }

  set card_number(card_number: string){
    this._card_number = card_number
  }

  get card_number(){
    return this._card_number
  }

  set expirity_year(expirity_year: string){
    this._expirity_year = expirity_year
  }

  get expirity_year(){
    return this._expirity_year
  }

  set address_id(address_id: number){
    this._address_id = address_id
  }

  get address_id(){
    return this._address_id
  }

  set payment_type_id(payment_type_id: number){
    this._payment_type_id = payment_type_id
  }

  get payment_type_id(){
    return this._payment_type_id
  }

  set customer_id(customer_id: string){
    this._customer_id = customer_id
  }

  get customer_id(){
    return this._customer_id
  }

  set id(id: number){
    this._id = id
  }

  get id(){
    return this._id
  }

  toJSON(){
    return {
      "name_on_card": this._name_on_card,
      "card_number": this._card_number,
      "expirity_month": this._expirity_month,
      "expirity_year": this._expirity_year,
      "address_id": this._address_id,
      "payment_type_id": this._payment_type_id,
      "customer_id": this._customer_id,
      "id": this._id
    }
  }
}