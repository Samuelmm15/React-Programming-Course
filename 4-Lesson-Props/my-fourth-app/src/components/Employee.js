// NOTA: PARA QUE LA FUNCIÓN REALICE LA OPCIÓN CORRECTA, SE TIENE QUE PONER EL RETURN, PORQUE SI NO SE PONE
// NO FUNCIONA COMO EN RUBY QUE LO RETORNA DE MANERA INMEDIATA AUNQUE NO SE PONGA EL RETURN
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

// NOTA: Para que una función retorne varias líneas de código HTML, se debe de hacer uso dentro de js de `return()`.
// NOTA: Cuando se quiere hacer uso de distintos bloques de líneas contenidos en un mismo bloque común, se hace uso de `<>` y `</>`.

// Hay que tener en cuenta que props es una variable cualquiera que tiene unas características que son especificadas en
// este caso como name y role, pero pueden ser otros como datos, url, etc.

export default Employee;