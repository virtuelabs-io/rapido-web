export class Rating {
  private _id: number;
  private _product_id: number;
  private _title: string;
  private _rating: number;
  private _summary: string;
  private _helpful: number;

  constructor() {}

  set id(id: number) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  set product_id(product_id: number) {
    this._product_id = product_id;
  }

  get product_id() {
    return this._product_id;
  }

  set title(title: string) {
    this._title = title;
  }

  get title() {
    return this._title;
  }

  set rating(rating: number) {
    this._rating = rating;
  }

  get rating() {
    return this._rating;
  }

  set summary(summary: string) {
    this._summary = summary;
  }

  get summary() {
    return this._title;
  }

  set helpful(helpful: number) {
    this._helpful = helpful;
  }

  get helpful() {
    return this._helpful;
  }

  toJSON() {
    return {
      id: this._id,
      product_id: this._product_id,
      title: this._title,
      rating: this._rating,
      summary: this._summary,
      helpful: this._helpful
    };
  }
}
