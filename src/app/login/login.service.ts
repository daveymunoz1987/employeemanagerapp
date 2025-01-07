import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class LoginService{

    private apiServerUrl = environment.apiUrl;
    
    constructor(private http: HttpClient) { };

    public validateLogin(url: string){
        return this.http.get<any>(url);
    }
}