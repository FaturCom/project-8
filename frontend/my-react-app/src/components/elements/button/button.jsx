const Button = (props) =>{
    const {children, variant, Id} = props

    return (
        <button className={`h-10 px-6 font-semibold rounded-md  ${variant} text-white cursor-pointer`} id={`${Id}`}>{children}</button>
    )
}

export default Button