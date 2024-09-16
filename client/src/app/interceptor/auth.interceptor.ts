import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
   // Retrieve the token from localStorage
   const token = localStorage.getItem('token');
   console.log('Retrieved Token:', token); // Debugging token retrieval
 
   // If the token is available, clone the request and set the Authorization header
   if (token) {
     const cloneRequest = req.clone({
       setHeaders: {
         Authorization: `Bearer ${token}` // Use token directly without result
       }
     });
     return next(cloneRequest);
   }
 
   // If no token is found, pass the request as is
   return next(req);
};
