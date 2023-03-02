import './index.css';
import Employee from './components/Employee';
// Esta librería importada a continuación sirve para poder actualizar los valores leídos en los
// inputs. Es decir, si se escribe algo en el input, el valor de la variable roleValue se actualiza.
// Si no se hace uso de esto, el valor de la variable roleValue no se actualiza por defecto.
import { useState } from 'react';

function App() {
  // De esta manera se crea el estado de la variable roleValue. El valor inicial de la variable es 'dev'.
  // Es decir, es similar a crear directamente la variable, pero de esta manera la variable se puede actualizar
  // en tiempo real.
  const [roleValue, setRoleValue] = useState('dev');
  const [employees, setEmployees] = useState([
    // En este punto debe de existir un array de objetos que contenga los datos de los empleados.
      // Dentro del array debe de existir un estructura básica que debe de contener la estructura de cada uno de los empleados.
      {
        id: 1,
        name: "Samuel", 
        role: "Developer", 
        img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      },
      {
        id: 2,
        name: "Andrea", 
        role: "Manager", 
        img: "https://images.pexels.com/photos/4940730/pexels-photo-4940730.jpeg",
      },
      {
        id: 3,
        name: "Pepe", 
        role: "Developer", 
        img: "https://images.pexels.com/photos/8680111/pexels-photo-8680111.jpeg",
      },
      {
        id: 4,
        name: "Luis", 
        role: "Developer", 
        img: "https://images.pexels.com/photos/7561906/pexels-photo-7561906.jpeg",
      },
    ]);
  console.log("we are about to list the Employees");
  const ShowEmployee = true;
  // let roleValue = 'dev';
  return (
    <div className="App">
      {
        /* 
         * This list of employees is not shown because the ShowEmployee variable is set to false.
         * If the ShowEmployee variable is set to true, the list of employees will be shown.
        */
      }
      {
        /*
         * This console.log() will be seen in the browser console, because the console of the React program is the console of the browser.
        */
        console.log('Inside the return component')
      }
      {
        ShowEmployee ? (
          <>
            {/* La línea de abajo sirve para que se muestre por la consola del navegador el valor que se escribe dentro
            del input. El onChange es un evento que se dispara cuando se escribe algo en el input. */}
            <input type="text" onChange={
              (e) => {
                console.log(e.target.value);
                // Después asignamos el valor del imput a una variable para poder hacer uso de esta.
                // roleValue = e.target.value;
                setRoleValue(e.target.value);
                // De esta manera anterior se asignan los valores para los estados que son actualizados en tiempo real.
              }
            } />
            <div className="flex flex-wrap justify-center">
              {employees.map((employee) => {
                return(
                <Employee
                  key={employee.id}
                  name={employee.name} 
                  role={employee.role} 
                  img={employee.img} 
                />
                );
              })}
            </div>
          </>
      ) : (
        <p>You can not see the employees</p>
      )}
    </div>
  );
}

export default App;