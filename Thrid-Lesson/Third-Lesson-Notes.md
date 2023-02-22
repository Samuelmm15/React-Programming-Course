# Third Lesson Notes

## Principal elements of React

React permits to create the different components of the programs, making use and mixing both HTML and Javascript.
In other words, it allows us to make use of HTML and Javascript to create the different components of the programs.

## Creación de componentes en React

At the folder `src/` we are gonna to create a new folder called `components`, that will content the different components
of the program. In this case, we are gonna to create a new file called `Employee.js` that will content the following 
code:

```javascript
function Employee() {
    <h3>There is an Employee</h3>
}

export default Employee;
```

Now we have the component `Employee` created, but we need to import it in the `App.js` file, so we can use it in the
program. To do this, we need to import the component in the `App.js` file, and then we need to use it in the `App.js`
file. The code of the `App.js` file will be the following:

```javascript
import Employee from './components/Employee';

function App() {
  return (
    <div className="App">
      <Employee /> # At this form we are using the component defined in the Employee.js file.
    </div>
  );
}
```

**Note:** At REACT, if we are gonna to use a javascript code, we need to use the `{}`. At the case that we are gonna to
use a component of HTML, we need to use the `<ComponentName />` form.