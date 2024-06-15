import { Navigate } from "react-router-dom";



const Privat = ({children}) => {

    const Atoken = localStorage.getItem('Access token');
    const Rtoken = localStorage.getItem('Refresh token');

  

     if(Atoken === null ){
        return <Navigate state={location.pathname} to = {'/login'}></Navigate>;
     }

     if(Atoken){
        return children;
     }

    return (
        <div>
            
        </div>
    );
};

export default Privat;