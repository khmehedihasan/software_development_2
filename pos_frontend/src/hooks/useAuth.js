import { useCookies } from 'react-cookie';
import useFirstLoad from './useFirstLoad';

function useAuth(){
    const [cookies] = useCookies(['auth']);
    useFirstLoad();
		

    if(cookies.auth === undefined){
        return(false);
    }else{
        return(true);
    }
}

export default useAuth;