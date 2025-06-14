import { error } from 'console';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router'; 
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';
import { AuthLoginData, AuthLoginResponse } from '../../models/auth';
import { response } from 'express';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  loginForm : FormGroup //formulaire de login
  loading = false; //pour savoir si une requete est en cours
  errorMessage = '' //message d'erreur
  successMessage = '' //messsage de success

  //constructeur pour  injecter:
  constructor(
    //formBuilder pour un formualire reactif
    private fb: FormBuilder,

    //le service de l'authentificaion
    private authSerice : AuthService,

    //router pour le changement de rout
    private router : Router
  ){
    //initialisation du formulaire
    this.loginForm = this.fb.group({
      email: [ '', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  //methode appelée lors de la soumission du formulaire
  onSubmit():void{
    //si le formulaire n'est pas valide, on arrete
    if(this.loginForm.invalid){
      return
    }

    //on passe loadign a true, pour signaler qu'une requete a été  envoyé
    this.loading = true
    
    //on recupre les donnees du formulaire
    const data : AuthLoginData  = this.loginForm.value

    //on fait appel au service
    this.authSerice.login(data).subscribe({

      //on sauvergae certaines donnees de l'utilisateur dans le local storage
      next: (response: AuthLoginResponse)=>{
        console.log(response)
        localStorage.setItem('token',response.token)
        localStorage.setItem('name', response.name)
        localStorage.setItem('email', response.email)
        //on met la valeur a null 
        localStorage.setItem('email_verified_at', response.email_verified_at || '' )
        //on converti l'id en string
        localStorage.setItem('id', String(response.id ?? ''))

        //message de success plus redirection
        this.successMessage = 'Connexion reussi, redirection en cours'
        setTimeout(()=>{
          this.router.navigate(['/'])
        },1500)
      },
      //en cas d'echec
      error:(err)=>{
        this.errorMessage = err.error?.message
        this.loading= false
      }

    })

  }


  
}
