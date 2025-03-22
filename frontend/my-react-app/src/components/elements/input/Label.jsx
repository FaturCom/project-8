const Label = (props) =>{
    const { htmlFor, children } = props
    return(
        <label htmlFor={htmlFor} className="black text-slate-700 text-sm font-bold mb-3">{children}</label>
    )
}

export default Label