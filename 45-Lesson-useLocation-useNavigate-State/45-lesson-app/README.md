# 44 lesson Notes

At this lesson, we are going to learn how to use the token provided by ty the API, first we need to save this token to the local storage of the user that login at the page, because we can use this token at future requests to the API, so we don't need to login again.

### localStorage

localStorage, permits us to save data at the browser, so we can use this data at future requests, this data is saved at the browser, so we can use it at the same browser, but if we change the browser, we need to login again.

### Clearing localStorage

To clear the localStorage, we can use the method clear() of the localStorage object, this method will clear all the data saved at the localStorage.

```js
localStorage.clear();
```

It returns undefined.

### Using the localStorage

We can use the information saved into the localStorage, so we can use it at future requests. For example, at our case, we can use this information to login to get
the information at the different customers storage at the data base of the API.

When we use the localStorage information to use the tokens at the different API requests, we need to use the Authorization header, and we need to use the token
provided by the API, so we can use the information saved at the localStorage. When we use the token, we need to use the `Bearer prefix`, so we can use the token
provided by the API.