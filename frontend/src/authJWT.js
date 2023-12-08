import axios from 'axios';
import jwt_decode from 'jwt-decode'

const axiosJWT = axios.create()
const refreshUser = async () =>{
  try {
      const refreshToken = localStorage.getItem("refreshUserToken")
      const response = await axiosJWT.post('/refresh', {
        //   method: 'POST',
          headers: {'Content-Type': 'application/json', authorization : 'Bearer ' + refreshToken}
      }).then(res => {
          console.log(res)
        //   localStorage.setItem("accessUserToken", res.datadata.accessToken)
        //   localStorage.setItem("refreshUserToken", data.refreshToken)
        //   localStorage.setItem("isAuthenticated", data.isAuthenticated)
          
      })
      
  } catch (error) {
      console.log(error)
  }
}

axiosJWT.interceptors.request.use(async (config) => {
  let currentDate = new Date()
//   console.log(currentDate)
  const token = localStorage.getItem("accessUserToken")
  const decodedToken = jwt_decode(token)
//   console.log(decodedToken.exp)
  if(decodedToken.exp * 1000 < currentDate.getTime()){
      const data = await refreshUser()
      config.headers["Authorization"] = "Bearer " + data.accessToken
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

export default axiosJWT