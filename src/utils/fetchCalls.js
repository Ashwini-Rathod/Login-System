import Cookies from "js-cookie";

function fetchCall(url,method, body){
   if(body){
       return(
           fetch(url, {
               method: method,
               headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("jwt")}`,
              },
              body: JSON.stringify(body),
           })
       )
   }
   return(
       fetch(url, {
           method: method,
           headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          }
       })
   )
}

export default fetchCall;