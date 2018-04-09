import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Group } from '../models/group.model';

@Injectable()
export class GroupService {
  private baseUrl = 'api/groups';

  constructor(private http: HttpClient) { }

  //returns all groups
  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl)
      .do(data => console.log('getGroups: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //return one specific group
  getGroup(id: number): Observable<Group> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Group>(url)
      .do(data => console.log('getSpecificGroup: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //adds one group to Groups list
  createGroup(group: Group) {
    group.id = undefined;
    return this.http.post<Group>(
        this.baseUrl,
        group,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }
      )
      .do(data => console.log('createGroup: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //delete one group from Groups list
  deleteGroup(id: number): Observable<Response> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(
      url,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    )
    .do(data => console.log('deleteGroup: ' + JSON.stringify(data)))
    .catch(this.handleError);
  }

  //updates one Group's details
  updateGroup(group: Group) {
    const url = `${this.baseUrl}/${group.id}`;
    return this.http.put(
      url,
      group,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    )
    .do(data => console.log('updateGroup: ' + JSON.stringify(data)))
    .catch(this.handleError);
  }

  //add member into group
  addUserIntoGroup(userId:number, groupId:number) {
    this.getGroup(groupId).subscribe(
      (group) => {
        group.groupMembers.push(userId);
        this.updateGroup(group).subscribe(
          () => true,
          (err) => console.log(err)
        );
      },
      (err) => console.log(err)
    );
  }

  //remove member from group
  deleteUserFromAllGroups(userId:number) {
    //get all groups
    this.getGroups().subscribe(
      (groups) => {
        groups.forEach(group => {
          //for each group, see if user exists
          //If so, then filter out user and update group in database
          if (this.userExistsInGroup(userId, group)) {
            group.groupMembers = group.groupMembers.filter(item => item !== userId);
            this.updateGroup(group).subscribe(
              () => true,
              (err) => console.log(err)
            );
          }
        });
      },
      (err) => console.log(err)
    );  }

  //search for Groups using the back-end API
  searchGroups(term: string): Observable<Group[]> {
    if (!term.trim()) {
      // if not search term, return empty Group array.
      return of([]);
    }
    const url = `${this.baseUrl}/?groupName=${term}`;
    return this.http.get<Group[]>(url)
      .do(data => console.log('searchGroups results: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  //helper function to determine whether user is a member
  private userExistsInGroup(userId: number, queryGroup: Group): boolean {
    if (queryGroup.groupMembers.indexOf(userId) > -1)
      return true;
    else
      return false;
  }

  private handleError(error: HttpResponse<any>): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw('Server error');
  }

}
