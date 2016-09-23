import { Injectable }               from '@angular/core';
import { Http, Headers, Response }  from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import { Router }                   from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { Account }                  from '../models/account';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  private resourcePath:string = "/app/resources/";

  constructor(private http:Http, private router:Router) {

  }

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  private getAccounts(): Observable<Account[]> {
    var fileName = this.resourcePath + "security.json";
    return this.http.get(fileName).map(this.extractData); //.catch(this.handleError);
  }

  login(username:string, password:string) {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
  
    this.getAccounts().map((result:Account[]) => {
      console.log("checking...");
      for (let idx in result) {
        console.log(result[idx]);
        if(result[idx].username == username && result[idx].password == password) {
          this.isLoggedIn = true;
        }
      }
    });
    return Observable.of(true).do(val => this.isLoggedIn = true);


    // return this.http
    //   .post(
    //     '/login', 
    //     JSON.stringify({ username, password }), 
    //     { headers }
    //   )
    //   .map(res => res.json())
    //   .map((res) => {
    //     if (res.success) {
    //       localStorage.setItem('auth_token', res.auth_token);
    //       this.isLoggedIn = true;
    //     }

      //   return res.success;
      // });

    //return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    protected handleError(error: Response) {
        console.error('An error occurred', error);
        return Observable.throw(error.json().error);
    }

}