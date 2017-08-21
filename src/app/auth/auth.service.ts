import * as firebase from 'firebase';

export class AuthService {
  token: string;
  uid: string;

  constructor() { }

  singIn(email: string, password: string): void {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        (user: firebase.User) => {
          firebase.auth().currentUser.getToken()
            .then(
              (token: string) => this.token = token
            );
          this.uid = user.uid;
          console.log(this.uid);
        }
      )
      .catch(
        (error: firebase.FirebaseError) => console.log(error)
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
    this.uid = null;
  }

  getToken(): string {
    firebase.auth().currentUser.getToken()
      .then((token: string) => this.token = token)
      .catch(error => console.log(error));
    return this.token;
  }

  getUid(): string {
    return this.uid;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

}
