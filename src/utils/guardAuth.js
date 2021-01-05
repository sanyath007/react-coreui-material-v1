import jwt from 'jsonwebtoken';
import { setCurrentUser, logout } from '../redux/auth';
import setAuthorization from './setAuthorizationToken';

export default function guardAuth(jwtToken, store) {
  if(jwtToken) {
    console.log('jwtToken is available');
    const { access_token: token, user } = JSON.parse(jwtToken);
  
    /** Option 1 comparing token.exp by Date.now */
    // const decodedToken = jwt.decode(token);
    // console.log(`${Date.now()} == ${decodedToken.exp}`);
    
    /** Option 1 Use jwt verify function */
    jwt.verify(token, 'puU29GeajPSk7ouhRi0fPMijbQzww5x6QUEMWRK1QVdWx6nmPKRsBi9unBXhmdoF', (err, decoded) => {  
      if (err) {     
        store.dispatch(logout()); 
        /** Set error message if token invalid */
        // err = {
        //   name: 'TokenExpiredError',
        //   message: 'jwt expired',
        //   expiredAt: decoded.exp
        // }
      } else {
        setAuthorization(token);
        store.dispatch(setCurrentUser(user));
      }
    });
  }
}
