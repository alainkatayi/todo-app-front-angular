import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router'; 
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  service: AuthService = inject(AuthService);
  route: Router = inject(Router);
  email: string = '';
  password: string = '';
  message: string = '';

  login() {
    this.service.login(this.email, this.password)
      .then((response: any) => {
        if (response.data) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('nom', response.data.name);
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('user_id', String(response.data.id));

          this.message = "Connexion réussie !";
          this.route.navigate(['/home']); 
        } else {
          //console.log(this.message)
          this.message = "Identifiants invalides.";
        }
      })
      .catch((error) => {
        console.error(error);
        this.message = "Erreur de connexion.";
      });

      console.log(this.email);
      //console.log(this.message)
  }
}
