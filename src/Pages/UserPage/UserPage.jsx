import useAuthStatus from '../../Hooks/useAuthStatus';
import Error from "../../Components/Error"

export default function UserPage(){
    const isLoggedIn = useAuthStatus()
    if(!isLoggedIn) return <Error/>
    return(
        <main className="min-h-screen">Hello</main>
    )
}