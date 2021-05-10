import { userConstants } from '../../_constants';
import AuthService from "../services/AuthService";
import { alertActions } from '..';
import UserService from '../services/UserService';
// export const register = (username, email, password) => (dispatch) => {
//     return AuthService.register(username, email, password).then(
//       (response) => {
//         dispatch({
//           type: REGISTER_SUCCESS,
//         });
  
//         dispatch({
//           type: SET_MESSAGE,
//           payload: response.data.message,
//         });
  
//         return Promise.resolve();
//       },
//       (error) => {
//         const message =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();
  
//         dispatch({
//           type: REGISTER_FAIL,
//         });
  
//         dispatch({
//           type: SET_MESSAGE,
//           payload: message,
//         });
  
//         return Promise.reject();
//       }
//     );
//   };
  
  export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
        user => {            
            dispatch(success(user));
            dispatch(alertActions.success('login successful'));
             UserService.getUser(user.user.login).then(
                u=>{
                  console.log("userrr",u);
                  localStorage.setItem("user",u)
                }     
            )
      },
      (error) => {
        // const message =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.message ||
        //   error.toString();
  
        // dispatch({
        //   type: LOGIN_FAIL,
        // });
  
        // dispatch({
        //   type: SET_MESSAGE,
        //   payload: message,
        // });
  
        // return Promise.reject();
      }
    );
  };
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
//   export const logout = () => (dispatch) => {
//     AuthService.logout();
  
//     dispatch({
//       type: LOGOUT,
//     });
//   };