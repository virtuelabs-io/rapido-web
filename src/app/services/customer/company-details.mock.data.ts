import { CompanyDetails } from './company-details'

export class CompanyDetailsMockData {
  public static postCompanyDetails = {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 7,
    serverStatus: 2,
    warningCount: 0,
    message: '',
    protocol41: true,
    changedRows: 0
  }

  public static putComapnyDetails = {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    serverStatus: 2,
    warningCount: 0,
    message: '(Rows matched: 1  Changed: 1  Warnings: 0',
    protocol41: true,
    changedRows: 1
  }

  public static company: CompanyDetails = new CompanyDetails(
    'company name',
    'addr_1',
    'city',
    'county',
    'country',
    'postcode',
    'addr_2',
    '1'
  )

  public static deleteCompany = {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    serverStatus: 2,
    warningCount: 0,
    message: '',
    protocol41: true,
    changedRows: 0
  }
}
