import { TestBed } from '@angular/core/testing';
import { Registration } from './registration';

describe('Registration', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('test if setters and getters work as expected', () => {
    const _registration: Registration = new Registration(
      "+440000000000",
      "test@gmail.com",
      "Username",
      "Password123",
      "true",
      "false",
      "true",
      "false",
      "true"
    );
    expect(_registration.phone_number).toEqual("+440000000000")
    expect(_registration.email).toEqual("test@gmail.com")
    expect(_registration.name).toEqual("Username")
    expect(_registration.password).toEqual("Password123")
    expect(_registration.acceptedTAndC).toEqual("true")
    expect(_registration.sendMePromotions).toEqual("false")
    expect(_registration.commViaEmail).toEqual("true")
    expect(_registration.commViaSMS).toEqual("false")
    expect(_registration.personalisation).toEqual("true")
  });

  it('createAttributeList test', () => {
    const _registration: Registration = new Registration(
      "+440000000000",
      "test@gmail.com",
      "Username",
      "Password123",
      "true",
      "false",
      "true",
      "false",
      "true"
    );

    _registration.createAttributeList()
    expect(_registration.attributeList.length).toBe(9)
  });

it('createUpdateAttributeList test', () => {
    const _registration: Registration = new Registration(
      "+440000000000",
      "test@gmail.com",
      "Username",
      "Password123",
      "true",
      "false",
      "true",
      "false",
      "true"
    );

    let updateAttributeList = _registration.createUpdateAttributeList()
    expect(updateAttributeList.length).toBe(6)
    updateAttributeList.forEach(value => {
      expect([ 'email', 'name', 'custom:sendMePromotions', 'custom:commViaEmail', 'custom:commViaSMS', 'custom:personalisation']).toContain(value.Name)
    })
  });
});
