import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { userCreated, UserToCreated } from "../interfaces/create.user";

@Injectable({
  providedIn: "root",
})
export class CrudService {

  private url: string = `${environment.api}`;

  constructor(private http: HttpClient) {}

  createUser(user: UserToCreated){
    return this.http.post<userCreated>(`${this.url}users`,user);
  }

  adduserStorage(user: userCreated){
    let users: userCreated[] = [];
    if (localStorage.getItem('users') === null || localStorage.getItem('users') === undefined) {
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      users = JSON.parse(localStorage.getItem('users'));
      users.push(user);
      localStorage.setItem('users',JSON.stringify(users));
    }
  }

  getAllUsers(): userCreated[] {
    let users: userCreated[] = [];
    users = JSON.parse(localStorage.getItem('users'));
    return users;
  }

  deleteUserStorage(id: string){
    let users: userCreated[] = [];
    users = JSON.parse(localStorage.getItem('users'));
    const index = users.findIndex(element => element.id === id);
    users.splice(index,1);
    localStorage.setItem('users', JSON.stringify(users));
  }

  updateUserStorage(user: userCreated){
    let users: userCreated[] = [];
    users = JSON.parse(localStorage.getItem('users'));
    const index = users.findIndex(element => element.id === user.id);
    users[index].name = user.name;
    users[index].job = user.job;
    localStorage.setItem('users', JSON.stringify(users));
  }
}
