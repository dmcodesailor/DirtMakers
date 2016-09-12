import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Credentials } from '../models/credentials';

@Injectable()
export class SecurityService {
    private authentic:boolean = false;

    constructor(private http:Http) { }

    public authenticate (credentialss:Credentials) {
        if (credentialss != null) {
            let credString:string = "";
            credString = JSON.stringify(credentialss);
            return this.http
                        .post('/login' 
                                , credString 
                                , { }
                            )
                        .map(res => res.json())
                        .map((res) => {
                            if (res.success) {
                                localStorage.setItem('auth_token', res.auth_token);
                                this.authentic = true;
                            }
                            return res.success;
                        });
        } else {
            // Do Something
        }
    }

}