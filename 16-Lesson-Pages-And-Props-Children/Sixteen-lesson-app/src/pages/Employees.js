import "../index.css";
import Employee from "../components/Employee";
// Esta librería importada a continuación sirve para poder actualizar los valores leídos en los
// inputs. Es decir, si se escribe algo en el input, el valor de la variable roleValue se actualiza.
// Si no se hace uso de esto, el valor de la variable roleValue no se actualiza por defecto.
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddEmployee from "../components/addEmployee";
import EditEmployee from "../components/EditEmployee";

function Employees() {
  // De esta manera se crea el estado de la variable roleValue. El valor inicial de la variable es 'dev'.
  // Es decir, es similar a crear directamente la variable, pero de esta manera la variable se puede actualizar
  // en tiempo real.
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

  function updateEmployee(id, newName, newRole) {
    const updatedEmployees = employees.map((employee) => {
      if (id === employee.id) {
        return { ...employee, name: newName, role: newRole };
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  }

  function newEmployee(name, role, img) {
    const newEmployee = {
      id: uuidv4(),
      name: name,
      role: role,
      img: img,
    };
    setEmployees([...employees, newEmployee]);
  }

  const ShowEmployee = true;
  // let roleValue = 'dev';
  return (
    // Cabe destacar que al poner el color del fondo de la página no se tiene en cuenta que lo que se
    // va a colorear solo es lo que tiene algún contenido de la página, por tanto, es necesario de la especificación
    // de la etiqueta min-h-screen que lo que hace es que pone el color del fondo de la página completamente
    <div className="App bg-gray-100 min-h-screen">
      {/*
       * This list of employees is not shown because the ShowEmployee variable is set to false.
       * If the ShowEmployee variable is set to true, the list of employees will be shown.
       */}
      {
        /*
         * This console.log() will be seen in the browser console, because the console of the React program is the console of the browser.
         */
        console.log("Inside the return component")
      }
      {ShowEmployee ? (
        <>
        {/* La etiqueta my-2 sirve para poder dejar espacios entre los distintos elementos que se muestran en la página. */}
          <div className="flex flex-wrap justify-center my-2">
            {employees.map((employee) => {
              const editEmployee = (
                <EditEmployee
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  updateEmployee={updateEmployee}
                />
              );
              return (
                <Employee
                  key={employee.id}
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  img={employee.img}
                  editEmployee={editEmployee}
                />
              );
            })}
          </div>
          <AddEmployee newEmployee={newEmployee} />
        </>
      ) : (
        <p>You can not see the employees</p>
      )}
    </div>
  );
}

export default Employees;