import './App.css';
import Employee from './components/Employee';

function App() {
  console.log("we are about to list the Employees");
  const ShowEmployee = true;
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
            <Employee name="Samuel" role="Programador"/>
            <Employee name="MiAmor" role="Nutricionista"/> 
            <Employee name="Isabella" />
            <Employee name="Pepe" />
            <Employee name="Juana" />
          </>
      ) : (
        <p>You can not see the employees</p>
      )}
    </div>
  );
}

export default App;
