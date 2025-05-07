import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Route } from '@angular/router';
//import { Router } from 'express';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/login';
  route =inject(Router)

  async login(email: string, password: string): Promise<any> {
    const user = { email, password };

    const response = await fetch(`${this.apiUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la connexion');
    }

    const rep = await response.json();
    console.log(rep);
    return rep;
  }
}
