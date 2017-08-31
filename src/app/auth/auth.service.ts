import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_URL_PATH } from '../shared/constants/url-constants';
import { ApiService } from '../shared/services/api.service';

@Injectable()
export class AuthService {
  user: firebase.User;
  token: string;
  role: string;

  constructor(private router: Router,
              private apiService: ApiService) { }

  singIn(email: string, password: string): void {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        (user: firebase.User) => {
          firebase.auth().currentUser.getToken()
            .then(
              (token: string) => {
                this.token = token;
                this.user = user;
                this.getUserRole();
                this.router.navigate(['/profile']);
              }
            );
        }
      )
      .catch(
        (error: firebase.FirebaseError) => {
          console.log(error);
          this.router.navigate(['/']);
        }
      );
  }

  signUp(email: string, password: string): void {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        (user: firebase.User) => console.log(user)
      )
      .catch(
        (error: firebase.FirebaseError) => console.log(error)
      );
  }

  logout(): void {
    firebase.auth().signOut();
    this.token = null;
    this.user = null;
  }

  getToken(): string {
    firebase.auth().currentUser.getToken()
      .then((token: string) => this.token = token)
      .catch(error => console.log(error));
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
  }

  getUser(): firebase.User {
    return this.user;
  }

  setUser(user: firebase.User): void {
    this.user = user;
  }

  updatedUserProfile(profile: {displayName: string, photoURL: string}): firebase.Promise<void> {
    return firebase.auth().currentUser.updateProfile(profile);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  checkTokenInLocalStorage() {
    const localStorageKey = Object.keys(window.localStorage).find(
      item => item.startsWith('firebase:authUser')
    );
    if (localStorageKey) {
      const user: firebase.User = JSON.parse(window.localStorage.getItem(localStorageKey));
      this.setUser(user);
      this.setToken(user['stsTokenManager']['accessToken']);
    }
  }

  getUserRole() {
    const token = this.token;
    const endPoint = API_URL_PATH.roles + '/' + this.user.uid;
    return this.apiService.get(endPoint, token)
      .subscribe(
        (response) => console.log(response.json())
      );
  }

}
