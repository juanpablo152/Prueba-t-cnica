import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token, UserLogin } from '../interfaces/user.login';
import { User } from "../interfaces/user.type";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = `${environment.api}login`;

  private _authenticatedUser: User = {
    active: true,
    lastName: "Apellido",
    secondLastName: "Apellido 2",
    createDate: new Date(),
    id: 1,
    secondName: "Nombre 2",
    firstName: "Nombre"
  };

  constructor(private http: HttpClient) {
  }

  public Authentication(user: UserLogin): Observable<Token>{
    if (user.email === 'eve.holt@reqres.in' && user.password === 'juanpablo152') {
      return this.http.post<Token>(this.url,user);
    } else {
      return this.http.post<Token>(this.url,user);
    }
  }

  public setToken(token: string) {
    localStorage.setItem("token", token);
  }

  public getToken() {
    return localStorage.getItem("token");
  }

  public getNames(names: {firstName?: boolean, secondName?: boolean, lastName?: boolean, secondLastName?: boolean}){
    // tslint:disable-next-line:prefer-const
    let output = [];
    if(names.firstName){
      output.push(AuthService.validateName(this._authenticatedUser.firstName));
    }
    if(names.secondName){
      output.push(AuthService.validateName(this._authenticatedUser.secondName));
    }
    if(names.lastName){
      output.push(AuthService.validateName(this._authenticatedUser.lastName));
    }
    if(names.secondLastName){
      output.push(AuthService.validateName(this._authenticatedUser.secondLastName));
    }
    return output.join(" ");
  }

  private static validateName(name: string){
    if(!name || name === "null" || name === "undefined"){
      return "";
    }
    return name;
  }
}
