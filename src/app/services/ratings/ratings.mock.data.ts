import { Rating } from './rating'

let ratings = new Rating()
ratings.helpful = 8
ratings.id = 4
ratings.product_id = 33
ratings.rating = 3
ratings.summary = 'A very good product'
ratings.title = 'Value for money'

export class RatingsMockData {
  public static ratingDetails: Rating[] = [ratings]

  public static productRatingsSummary: Rating[] = [ratings]

  public static helpfulRatingIncrement = {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    serverStatus: 2,
    warningCount: 0,
    message: '(Rows matched: 1  Changed: 1  Warnings: 0',
    protocol41: true,
    changedRows: 1,
  }

  public static deactivateRating = {
    affectedRows: 1,
    changedRows: 1,
    fieldCount: 0,
    insertId: 0,
    message: '(Rows matched: 1  Changed: 1  Warnings: 0',
    protocol41: true,
    serverStatus: 2,
    warningCount: 0,
  }

  public static createRating = {
    affectedRows: 0,
    changedRows: 0,
    fieldCount: 0,
    insertId: 0,
    message: '',
    protocol41: true,
    serverStatus: 2,
    warningCount: 0,
  }

  public static updateRating = {
    affectedRows: 0,
    changedRows: 0,
    fieldCount: 0,
    insertId: 0,
    message: '',
    protocol41: true,
    serverStatus: 2,
    warningCount: 0,
  }
}
