import axiosInstance from "./../../Network/Config";

export const LoginThunk = () => (dispatch) => {

    let token = localStorage.getItem('token');
   
  return axiosInstance
    .get("/login")
    .then((res) => {
        console.log( "response is",res)
        //  token = localStorage.getItem('token');
        console.log("token is ====>", token)
        dispatch({
            type: "GET_LOGIN_TOKEN",
            payload: token
          })
      
    })
    // .then()
    .catch((error) => {
      if (error.res && error.res.status >= 400 && error.res.status <= 500) {
        console.log("error from sign up thunk Actions");
        // setUserError("erroR", error.res.user.message);
      }
    });
};

// export function signUp(fields, success) {
//     return function(dispatch) {
//         axios.post(`${ROOT_URL}/signUp`, fields)
//             .then(response => {
//                 const { token } = response.data;
//                 localStorage.setItem('token', token);
//                 localStorage.getItem('token');
//                 dispatch({
//                     type: STORE_USER,
//                     payload: response.data
//                 })
//                 success()
//             })
//             .catch(err => {
//                 if(err) { console.log(err) }
//             })
//     }
// }


// const token = localStorage.getItem('token');
