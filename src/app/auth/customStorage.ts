import { Injectable } from "@angular/core";
import { AbstractSecurityStorage } from "angular-auth-oidc-client";

@Injectable({
    providedIn: 'root'
  })
export class CustomStorage implements AbstractSecurityStorage {

    public read(key: string): any {
        if (!!localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key) as string );
        }

        return null;
    }

    public write(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public remove(key: string): void {
        localStorage.removeItem(key);
    }
}