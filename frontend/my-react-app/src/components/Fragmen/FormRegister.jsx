import InputForm from '../elements/input/element'
import Button from '../elements/button/button'
import{Link} from 'react-router-dom'

const FormRegister = () =>{
    
    return (
        <form action="">
            <InputForm name="username" type="text" placeholder="exampell username" label="username"></InputForm>
            <InputForm name="password" type="password" placeholder="******" label="password"></InputForm>
            <InputForm name="confirmPassword" type="password" placeholder="******" label="confirm password"></InputForm>
            <Button variant="bg-blue-600 w-full mt-3 hover:bg-blue-700" Id="loginBtn">Register</Button>
            <p className='mt-5 text-center'>Have an account? <Link className='font-bold text-blue-600' to="/login">login</Link></p>
        </form>
    )
}

export default FormRegister