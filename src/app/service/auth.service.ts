import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Route } from '@angular/router';
//import { Router } from 'express';
import { Router } from '@angular/router';
import { error } from 'console';
import { HttpClient } from '@angular/common/http';
import { environement } from '../../environements/environement';
import { AuthLoginData, AuthLoginResponse } from '../models/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environement.apiUrl ;
  constructor(private http:HttpClient){}
  
  //methode pour la connexion
  login(Data:AuthLoginData):Observable<AuthLoginResponse>{
    return this.http.post<AuthLoginResponse>(this.url + 'login', Data)
  }
}
