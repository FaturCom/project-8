import InputForm from '../elements/input/element'
import Button from '../elements/button/button'
import{Link} from 'react-router-dom'

const FormLogin = () =>{
    
    return (
        <form action="">
            <InputForm name="username" type="text" placeholder="exampell username" label="username"></InputForm>
            <InputForm name="password" type="password" placeholder="******" label="password"></InputForm>
            <Button variant="bg-blue-600 w-full mt-3 hover:bg-blue-700" Id="loginBtn">Login</Button>
            <p className='mt-5 text-center'>don't have an account <Link className='font-bold text-blue-600' to="/register">Register</Link></p>
        </form>
    )
}

export default FormLogin