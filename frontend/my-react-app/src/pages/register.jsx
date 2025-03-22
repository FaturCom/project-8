import AuthLayout from "../components/Layouts/AuthLayouts";
import FormRegister from "../components/Fragmen/FormRegister";

const registerPage = () =>{
    return (
        <AuthLayout title="Register">
            <FormRegister />
        </AuthLayout>
    )
}

export default registerPage