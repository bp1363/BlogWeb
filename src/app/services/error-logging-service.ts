import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorLoggingService {
  getError(){
    console.log("Page Not Found Please click here to return Home Page");
    
  }
  
}
