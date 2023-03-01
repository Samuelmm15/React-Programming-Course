import './App.css';
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
  console.log("we are about to list the Employees");
  const ShowEmployee = true;
  // let roleValue = 'dev';
  return (
    <div className="App bg-red-300">
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
            <Employee name="Samuel" role="Programador"/>
            <Employee name="MiAmor" role="Nutricionista"/> 
            <Employee name="Isabella" role={roleValue}/>
            <Employee name="Pepe" role={roleValue}/>
            <Employee name="Juana" />
          </>
      ) : (
        <p>You can not see the employees</p>
      )}
    </div>
  );
}

export default App;