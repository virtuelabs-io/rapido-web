import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RapidoHttpService } from './rapido-http.service';
import { ProfileService } from '../authentication/profile/profile.service';

class User {
  constructor(private _name: string){ }
  get name(){
    return this._name
  }
}
class UserService extends RapidoHttpService<User>{
  constructor(protected _http: HttpClient, protected _profileService: ProfileService){
    super(_http, _profileService)
  }
}

describe('RapidoHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ProfileService ]
    })
  );

  it('should be created', () => {
    const service: RapidoHttpService<string> = TestBed.get(RapidoHttpService);
    expect(service).toBeTruthy();
  });

  it(
    'GET entity',
    fakeAsync(
      inject(
        [HttpTestingController, ProfileService, HttpClient],
        (backend: HttpTestingController, profileService: ProfileService, httpClient: HttpClient) => {

          // Set up
          const url = "https://rapidobuild.com/api/user/"
          const user = new User("rocky")
          const service = new UserService(httpClient, profileService)
          const responseObject = {
            body: user,
            status: 200
          };
          let response = null;
          // End Setup

          service.get(url).subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => {}
          );

          const requestWrapper = backend.expectOne({url: url});
          requestWrapper.flush(responseObject);

          tick();

          expect(requestWrapper.request.method).toEqual('GET');
          expect(response.body.name).toEqual("rocky");
          expect(response.status).toBe(200);
        }
      )
    )
  );
  it(
    'GET entity list',
    fakeAsync(
      inject(
        [HttpTestingController, ProfileService, HttpClient],
        (backend: HttpTestingController, profileService: ProfileService, httpClient: HttpClient) => {

          // Set up
          const url = "https://rapidobuild.com/api/user/list"
          const user = new User("rocky")
          const service = new UserService(httpClient, profileService)
          const responseObject = {
            body: [ user, user ],
            status: 200
          };
          let response = null;
          // End Setup

          service.get(url).subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => {}
          );

          const requestWrapper = backend.expectOne({url: url});
          requestWrapper.flush(responseObject);

          tick();

          expect(requestWrapper.request.method).toEqual('GET');
          expect(response.body.length).toEqual(2);
          expect(response.status).toBe(200);
        }
      )
    )
  );
  it(
    'POST entity',
    fakeAsync(
      inject(
        [HttpTestingController, ProfileService, HttpClient],
        (backend: HttpTestingController, profileService: ProfileService, httpClient: HttpClient) => {

          // Set up
          const url = "https://rapidobuild.com/api/user/"
          const user = new User("rocky")
          const service = new UserService(httpClient, profileService)
          const responseObject = {
            body: user,
            status: 201
          };
          let response = null;
          // End Setup

          service.post(url, user).subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => {}
          );

          const requestWrapper = backend.expectOne({url: url});
          requestWrapper.flush(responseObject);

          tick();

          expect(requestWrapper.request.method).toEqual('POST');
          expect(response.body.name).toEqual("rocky");
          expect(response.status).toBe(201);
        }
      )
    )
  );
  it(
    'POST entity list',
    fakeAsync(
      inject(
        [HttpTestingController, ProfileService, HttpClient],
        (backend: HttpTestingController, profileService: ProfileService, httpClient: HttpClient) => {

          // Set up
          const url = "https://rapidobuild.com/api/user/list"
          const user = new User("rocky")
          const service = new UserService(httpClient, profileService)
          const responseObject = {
            body: [ user, user ],
            status: 201
          };
          let response = null;
          // End Setup

          service.postList(url, [user, user]).subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => {}
          );

          const requestWrapper = backend.expectOne({url: url});
          requestWrapper.flush(responseObject);

          tick();

          expect(requestWrapper.request.method).toEqual('POST');
          expect(response.body.length).toEqual(2);
          expect(response.status).toBe(201);
        }
      )
    )
  );
  it(
    'PUT entity',
    fakeAsync(
      inject(
        [HttpTestingController, ProfileService, HttpClient],
        (backend: HttpTestingController, profileService: ProfileService, httpClient: HttpClient) => {

          // Set up
          const url = "https://rapidobuild.com/api/user/"
          const user = new User("rocky")
          const service = new UserService(httpClient, profileService)
          const responseObject = {
            body: user,
            status: 202
          };
          let response = null;
          // End Setup

          service.put(url, user).subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => {}
          );

          const requestWrapper = backend.expectOne({url: url});
          requestWrapper.flush(responseObject);

          tick();

          expect(requestWrapper.request.method).toEqual('PUT');
          expect(response.body.name).toEqual("rocky");
          expect(response.status).toBe(202);
        }
      )
    )
  );
  it(
    'DELETE entity',
    fakeAsync(
      inject(
        [HttpTestingController, ProfileService, HttpClient],
        (backend: HttpTestingController, profileService: ProfileService, httpClient: HttpClient) => {

          // Set up
          const url = "https://rapidobuild.com/api/user/rocky"
          const service = new UserService(httpClient, profileService)
          const responseObject = {
            body: null,
            status: 204
          };
          let response = null;
          // End Setup

          service.delete(url).subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => {}
          );

          const requestWrapper = backend.expectOne({url: url});
          requestWrapper.flush(responseObject);

          tick();

          expect(requestWrapper.request.method).toEqual('DELETE');
          expect(response.status).toBe(204);
        }
      )
    )
  );

  it(
    'GET entity with headers',
    fakeAsync(
      inject(
        [HttpTestingController, ProfileService, HttpClient],
        (backend: HttpTestingController, profileService: ProfileService, httpClient: HttpClient) => {

          // Set up

          const url = "https://rapidobuild.com/api/user/"
          const user = new User("rocky")
          const service = new UserService(httpClient, profileService)
          const responseObject = {
            body: user,
            status: 200
          };
          let response = null;
          const httpHeaders: HttpHeaders = service.initializeHeaders()
          // End Setup

          service.get(url, httpHeaders).subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => {}
          );

          const requestWrapper = backend.expectOne({url: url});
          requestWrapper.flush(responseObject);

          tick();

          expect(requestWrapper.request.method).toEqual('GET');
          expect(response.body.name).toEqual("rocky");
          expect(response.status).toBe(200);
        }
      )
    )
  );
  it(
    'GET entity list with headers',
    fakeAsync(
      inject(
        [HttpTestingController, ProfileService, HttpClient],
        (backend: HttpTestingController, profileService: ProfileService, httpClient: HttpClient) => {

          // Set up
          const url = "https://rapidobuild.com/api/user/list"
          const user = new User("rocky")
          const service = new UserService(httpClient, profileService)
          const responseObject = {
            body: [ user, user ],
            status: 200
          };
          let response = null;
          const httpHeaders: HttpHeaders = service.initializeHeaders()
          // End Setup

          service.get(url, httpHeaders).subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => {}
          );

          const requestWrapper = backend.expectOne({url: url});
          requestWrapper.flush(responseObject);

          tick();

          expect(requestWrapper.request.method).toEqual('GET');
          expect(response.body.length).toEqual(2);
          expect(response.status).toBe(200);
        }
      )
    )
  );
  it(
    'POST entity with headers',
    fakeAsync(
      inject(
        [HttpTestingController, ProfileService, HttpClient],
        (backend: HttpTestingController, profileService: ProfileService, httpClient: HttpClient) => {

          // Set up
          const url = "https://rapidobuild.com/api/user/"
          const user = new User("rocky")
          const service = new UserService(httpClient, profileService)
          const responseObject = {
            body: user,
            status: 201
          };
          let response = null;
          const httpHeaders: HttpHeaders = service.initializeHeaders()
          // End Setup

          service.post(url, user, httpHeaders).subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => {}
          );

          const requestWrapper = backend.expectOne({url: url});
          requestWrapper.flush(responseObject);

          tick();

          expect(requestWrapper.request.method).toEqual('POST');
          expect(response.body.name).toEqual("rocky");
          expect(response.status).toBe(201);
        }
      )
    )
  );
  it(
    'POST entity list with headers',
    fakeAsync(
      inject(
        [HttpTestingController, ProfileService, HttpClient],
        (backend: HttpTestingController, profileService: ProfileService, httpClient: HttpClient) => {

          // Set up
          const url = "https://rapidobuild.com/api/user/list"
          const user = new User("rocky")
          const service = new UserService(httpClient, profileService)
          const responseObject = {
            body: [ user, user ],
            status: 201
          };
          let response = null;
          const httpHeaders: HttpHeaders = service.initializeHeaders()
          // End Setup

          service.postList(url, [user, user], httpHeaders).subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => {}
          );

          const requestWrapper = backend.expectOne({url: url});
          requestWrapper.flush(responseObject);

          tick();

          expect(requestWrapper.request.method).toEqual('POST');
          expect(response.body.length).toEqual(2);
          expect(response.status).toBe(201);
        }
      )
    )
  );
  it(
    'PUT entity with headers',
    fakeAsync(
      inject(
        [HttpTestingController, ProfileService, HttpClient],
        (backend: HttpTestingController, profileService: ProfileService, httpClient: HttpClient) => {

          // Set up
          const url = "https://rapidobuild.com/api/user/"
          const user = new User("rocky")
          const service = new UserService(httpClient, profileService)
          const responseObject = {
            body: user,
            status: 202
          };
          let response = null;
          const httpHeaders: HttpHeaders = service.initializeHeaders()
          // End Setup

          service.put(url, user, httpHeaders).subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => {}
          );

          const requestWrapper = backend.expectOne({url: url});
          requestWrapper.flush(responseObject);

          tick();

          expect(requestWrapper.request.method).toEqual('PUT');
          expect(response.body.name).toEqual("rocky");
          expect(response.status).toBe(202);
        }
      )
    )
  );
  it(
    'DELETE entity with headers',
    fakeAsync(
      inject(
        [HttpTestingController, ProfileService, HttpClient],
        (backend: HttpTestingController, profileService: ProfileService, httpClient: HttpClient) => {

          // Set up
          const url = "https://rapidobuild.com/api/user/rocky"
          const service = new UserService(httpClient, profileService)
          const responseObject = {
            body: null,
            status: 204
          };
          let response = null;
          const httpHeaders: HttpHeaders = service.initializeHeaders()
          // End Setup

          service.delete(url, httpHeaders).subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => {}
          );

          const requestWrapper = backend.expectOne({url: url});
          requestWrapper.flush(responseObject);

          tick();

          expect(requestWrapper.request.method).toEqual('DELETE');
          expect(response.status).toBe(204);
        }
      )
    )
  );
  it(
    'Checking httpHeader initialization',
    fakeAsync(
      inject(
        [ProfileService, HttpClient],
        (profileService: ProfileService, httpClient: HttpClient) => {
          const service = new UserService(httpClient, profileService)
          const httpHeaders: HttpHeaders = service.initializeHeaders()
          expect(httpHeaders.get('Content-Type')).toEqual('application/json')
        }
      )
    )
  );
});
