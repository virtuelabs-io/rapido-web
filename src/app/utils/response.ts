export class Response {
  constructor(
    private _code: number,
    private _message: string,
    private _data?: any
  ) {}

  set code(code) {
    this._code = code;
  }

  get code() {
    return this._code;
  }

  set message(message) {
    this._message = message;
  }

  get message() {
    return this._message;
  }

  set data(data) {
    this._code = data;
  }

  get data() {
    return this._data;
  }
}
