import EditEmployee from "./EditEmployee";

/* eslint-disable jsx-a11y/alt-text */
function Employee(props) {
    return (
        <div class="min-w-[350px] max-w-[350px] m-2 py-8 px-8 max-w-sm bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
            {/* Nótese que se hace uso de las sentencias como object cover o rounded-full para darle a las imágenes de perfil una apariencia 
            de redondeo a las imágenes que se encuentran dentro.*/}
            <img 
            class="object-cover rounded-full h-[100px] w-[100px] block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" 
            src={props.img} 
            />
            <div class="text-center space-y-2 sm:text-left">
                <div class="space-y-0.5">
                    <p class="text-lg text-black font-semibold">
                        {props.name}
                    </p>
                    <p class="text-slate-500 font-medium">
                        {props.role}
                    </p>
                </div>

                {/* Para poder tener el nombre y el rol de cada uno de los empleados, es necesario como un
                prop hacia el nuevo componente a partir del componente anterior. Hay que tener en cuenta
                que el primer componente es el de las tarjetas de los empleados, mientras que el segundo
                componente es el formulario del empleado. */}
                <EditEmployee name={props.name} role={props.role}/>

            </div>
        </div>
    );
}

export default Employee;