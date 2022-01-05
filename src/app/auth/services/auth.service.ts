import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _auth:  Auth | undefined;
  
  verificaAuentication(): Observable<boolean>{
    if(!localStorage.getItem('token')){
      return of(false);
    }
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map(auth => {
          this._auth = auth; 
          return true;
        })
      )
  
  }
  
  get auth(): Auth{
    return {...this._auth!};
  }
  constructor(private http: HttpClient ) { }

  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
         //tap es para agregar una acción secundaria y que la haga antes
      //de que llegue al suscribe en el componente
        tap(auth => this._auth = auth),
        tap(auth => localStorage.setItem('token', auth.id.toString()))

      );
  }

  logout(){
    this._auth = undefined;
  }
}
