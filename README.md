# React-Hook-Form + Zod exercises using Typescript

In this project you can find an example of a:

- Form just using React
- Form using React-Hook-Form
- Form using React-Hook-Form and Zod

Investigating, analizing and modifying them, helped me understand forms and technologies related much better.

---

### 🔹 Controlled form VS React-Hook-Form

In a controlled form, any change in the form fields triggers a state update, which in turn triggers a re-render of the component. This can result in unnecessary re-renders if not handled properly. To optimize performance, you can use techniques like memoization or shouldComponentUpdate to prevent unnecessary re-renders.

React Hook Form, on the other hand, manages the form state internally, so it can help avoid `unnecessary re-renders`. It uses a form state object that is updated only when the form values change. This can reduce the number of re-renders compared to a traditional controlled form where the state is updated on every form field change.

---

### 🔹 React-Hook-Form VS Zod

React-Hook-Form is giving us validation on the client's side. But we may also want to perform the same validation on the server and other places, such as local storage. When a user comes back, maybe we want to retrieve the data from local storage. So, it's important to validate the data to ensure it is in the correct shape. With React Hook Form, we currently only have client-side validation, but with Zod, we can do the other kinds of validation.

With Zod we can create a schema, and then connect it to React-hook-form. Then, in React-hook-form, the validation is not needed. Because we are using the Zod's schema there and anywhere else we want.

### 🔹 @hookform/resolvers

@hookform/resolvers is a library that provides resolvers for validating form inputs using the react-hook-form library. It allows you to use popular validation libraries such as Yup, Joi, Formik or Zod with react-hook-form to handle form validation.

With @hookform/resolvers, you can define your validation schema using the validation library of your choice, and then `use the resolver functions provided by @hookform/resolvers to integrate the validation with react-hook-form` (resolvers are functions that are used to validate form inputs)

### 🔹 Zod & Api Route

Having the Zod Schema in a separate file (inside the `lib` folder) can give us validation not only for the client's side (connecting with React-Hook-Form), but also with the API endopoint we have in the `api` folder.

👉 However, this validation is not sufficient to ensure that the data is valid. `It only checks if the data matches the schema, but it does not enforce any data type restrictions` (unless you check the Chrome's network response, although you probably won't if you just see a 200 response!)

To enforce data type restrictions on the server-side, one must not forget to add `NextResponse` items with the server status:

```
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      // result.error.flatten().forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    console.log(zodErrors);
    return NextResponse.json({ errors: zodErrors }, { status: 400 });
  }
```

### 🔹 Typescript

- Trick to know the value of 'data':

  ![data type typescript](https://github.com/vanesascode/vanesascode_portfolio/assets/131259155/3270f44b-1fb0-4e0b-b8d4-a6ca9d6b6bda)

  ![image](https://github.com/vanesascode/vanesascode_portfolio/assets/131259155/98f3a8db-9e68-4265-b72f-0c266c0c0336)

### 🔹 Browser's preflight request

This is a security feature of `CORS` (Cross-Origin Resource Sharing) that the browser sends to the server to check if it's okay to send the actual request.

When you're making a POST request with custom headers (like Content-Type: application/json), the browser sends a preflight request to the server to check if it's okay to send the actual POST request. This preflight request is an OPTIONS request and it's sent before the actual POST request.

The server responds to the preflight request with a 200 status code, indicating that `it's okay for the browser to send the actual POST request`. This is why you see the 200 response in the network tab before you've even submitted the form.
