function Employee(props) {
    return (
        <>
            <h3>Employee Name: {props.name}</h3>
            <p>{props.role ? props.role : 'No role'}</p>
            {/* Esto es lo mismo que la línea anterior, pero se puede hacer de estas dos maneras. */}
            {/* {props.role ? (
                <p class="role">{props.role}</p> 
                ) : (
                <p class="role">No role</p>} 
                )*/}
        </>
    ); 
}

export default Employee;