import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-register',
  imports: [
    FormsModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup
  loading = false
  errorMessage = ''
  successMessage = ''

  constructor(
    //formBuilder pour un formulaire reactif
    private fb: FormBuilder,
    //le service
    private authService: AuthService,
    //pour le changement de route
    private route: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]]

    },{validators:this.passwordMatchValidator}
  )
  }

  //validation personnalisé pour verifié si les deux password son similaire
  passwordMatchValidator(form: AbstractControl): ValidationErrors | null{
    const password =form.get('password')?.value
    const confirmation = form.get('password_confirmation')?.value
    return password == confirmation ? null :{passwordsMisMatch:true}
  }

  onSubmit(): void {
    //si lef formualire est invalide
    if (this.registerForm.invalid) {
      return
    }
    //dans le cas contraire

    this.loading = true
    //on recupere les donnees du formulaire
    const data = this.registerForm.value

    this.authService.register({
      name:data.name,
      email:data.email,
      password: data.password,
      password_confirmation:data.password_confirmation
    }).subscribe({
      next: () => {
        this.errorMessage = ''
        this.successMessage = 'SUccess'
        console.log(this.successMessage)
              setTimeout(()=>{
          this.route.navigate(['/'])
        },1500)
        this.registerForm.reset()
        this.ngOnInit()
      },
      error:(error)=>{
        this.errorMessage = error.error.message
        console.log(this.errorMessage)
      }
    })
  }
}
