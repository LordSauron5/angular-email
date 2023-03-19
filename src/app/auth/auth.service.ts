import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

interface signinCredentials {
  username: string,
  password: string
}

interface signinResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(null); //$ at the end means observable or observable like behavior
  username = '';

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(this.rootUrl + '/auth/username', {
      username
    })
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(
      this.rootUrl + '/auth/signup', credentials, {
      // withCredentials: true
    })
      .pipe(
        tap(({username}) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }

  checkAuth() {
    return this.http.get<SignedinResponse>(
      this.rootUrl + '/auth/signedin', {
      // withCredentials: true
    })
      .pipe(
        tap(({ authenticated, username }) => {
          this.signedin$.next(authenticated);
          this.username = username;
        })
      );
  }

  signout() {
    return this.http.post(this.rootUrl + '/auth/signout', {})
      .pipe(
        tap(() => {
          this.signedin$.next(false);
        })
      );
  }

  signin(credentials: signinCredentials) {
    return this.http.post<signinResponse>(this.rootUrl + '/auth/signin', credentials)
      .pipe(
        tap(({username}) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }
}
