import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {


  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {
    const email = form.value['email'];
    const password = form.value['password'];
    this.authService.singIn(email, password);
    this.router.navigate(['/']);
  }

}
