# Fourth Lesson Notes

## Implementation of `props` in the js functions

`props` is a variable that is passed to the js function. It is a dictionary that contains the values of the properties 
of the component. The keys of the dictionary are the names of the properties of the component.

```js
// Examples of different props values
function Employee(props) {
    return (
        <>
        <h1>Employee Name: {props.name}</h1>
        <p>Employee Age: {props.age}</p>
        </>
    );
}