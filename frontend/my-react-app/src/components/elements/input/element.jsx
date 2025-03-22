import Input from './Input'
import Label from './Label'

const InputForm = (props) => {
    const {type, name, placeholder, label} = props
    return (
        <div>
            <Label htmlForm={name}>{label}</Label>
            <Input type={type} name={name} placeholder={placeholder}/>
        </div>
    )
}

export default InputForm