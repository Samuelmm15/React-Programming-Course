# 46 lesson Notes

At this lesson, we are going to learn the useContext hook.

## useContext

The useContext hook is used to pass data through the component tree without having to pass props down manually at every level.

In other words, this hook permits us to create a structure that is common to the different components of our application, so it is not neccesary to pass the same props to every component.
 
`NOTE:`
To create a context, first we need to create this context into a global file, and then we need to import it into the component that we want to use it.

### Example

At the case of the lesson, we are going to create the context into the file called `App.js`.