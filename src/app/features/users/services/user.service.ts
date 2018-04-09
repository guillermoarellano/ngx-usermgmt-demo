import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { User } from '../models/user.model';
import { unescapeIdentifier } from '@angular/compiler';

@Injectable()
export class UserService {
  private baseUrl = 'api/users';

  constructor(private http: HttpClient) { }

  //returns all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl)
      .do(data => console.log('getUsers: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //return one specific user
  getUser(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(url)
      .do(data => console.log('getSpecificUser: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //TODO: respond with a observable<User>, rename to createUser
  //adds one user to users list
  addUser(user: User) {
    user.id = undefined;
    return this.http.post<User>(
        this.baseUrl,
        user,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }
      )
      .do(data => console.log('addUser: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //TODO: rename to deleteUser
  //removes one user from users list
  removeUser(id: number): Observable<Response> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(
      url,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    )
    .do(data => console.log('deleteUser: ' + JSON.stringify(data)))
    .catch(this.handleError);
  }

  //updates one user's details
  updateUser(user: User) {
    const url = `${this.baseUrl}/${user.id}`;
    return this.http.put(
      url,
      user,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    )
    .do(data => console.log('updateUser: ' + JSON.stringify(data)))
    .catch(this.handleError);
  }

  //search for Users using the back-end API
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty User array.
      return of([]);
    }
    const url = `${this.baseUrl}/?userName=${term}`;
    return this.http.get<User[]>(url)
      .do(data => console.log('searchUsers results: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(error: HttpResponse<any>): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw('Server error');
  }

}