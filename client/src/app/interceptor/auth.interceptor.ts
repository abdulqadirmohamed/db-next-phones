import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  let loggedUserData: any;
  const token = localStorage.getItem('token');
  console.log('Retrieved Token:', token);  // Should print the token or null if it doesn't exist

  if (token != null) {
    loggedUserData = token
    console.log(loggedUserData)
  } 
  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${loggedUserData.result.token}`,
    },
  });

  return next(cloneRequest);
};
