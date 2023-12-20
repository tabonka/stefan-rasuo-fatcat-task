## Complete the following tasks

### Transfer the project to TypeScript

Your first task involves transitioning this project 
from JavaScript to TypeScript. To ensure a robust 
and type-safe codebase, please configure TypeScript
with the following compiler options:
* "noImplicitAny": true
* "strict": true
* "strictNullChecks": true
* "noImplicitThis": true

Additionally, implement import aliases in your project
configuration. Set up your imports to use the format
***@homework-task/path/to/file.ts***.

In the ***src/components*** folder, you will find several
components. Your goal is to enhance these components with
appropriate TypeScript interfaces and types.

### Create a List Component

Develop a React component that is both scalable and reusable,
designed to fetch and display data from an API in a list
format. The specific API endpoint to be used is
https://jsonplaceholder.typicode.com/users. For each item 
in the list, ensure that the following keys are displayed:
***id***, ***name***, ***email***, ***dateOfBirth***, and ***phone***.


### Create a Form Generator Component

1. Develop a scalable and reusable React component with the
following capabilities:

* **Validation Schema:** Accept a validation schema prop to ensure form data adheres to specified rules.
* **API Hook Call:** Incorporate an API hook that handles states such as data, isLoading, and isError.
* **Callback Function for Form Rendering:** Implement a callback function prop (renderForm) that renders the form elements and handles their state appropriately.

2. Component Implementation:
* Utilize this component to create a form with two fields:
  * Input Field (‘title’): A required field with a maximum character limit.
  * Textarea Field (‘body’): Also a required field with a maximum character limit.
* Both fields should display error messages if the input doesn't meet the criteria set by the validation schema.
* For form submissions, use the POST method at https://jsonplaceholder.typicode.com/posts.

Recommended libraries, but you can use whatever you prefer:
* ***React Query:*** For handling API calls.
* ***Zod:*** For defining the validation schema.
* ***React Hook Form:*** For managing form state, submission, and logic.

Alternatively, you're free to use any library or custom solution that aligns with the above requirements.

Component Example **(this does not have to be the exact implementation)**:

```tsx
<CreateForm<ICreateCycleFormInputs>
    useMutation={useSomeMutation}
    validationSchema={someSchema}
    successMessage="Successfully created something"
    renderForm={({ register, errors }) => (
        <>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                autoFocus
                {...register('name')}
            />
        </>
    )}
/>
```


### Create a Page Generator Component
Your task is to create a reusable React component for
building web pages. This component should be designed 
to handle a variety of page layouts and components 
dynamically, based on the props it receives.
* ***Dynamic Layout Handling:*** The component must handle different page layouts.
* ***Scalability and Reusability:*** It should be easily scalable to accommodate future layout types and be reusable across different pages.
* ***Prop Structure:*** The main prop is an array of objects, each representing a section of the page with its own layout and components.
  * Each object in this array contains:
    * type: identifying the layout type.
    * components: an array of objects, each describing a component to be rendered in this section.
    * props: properties specific to that layout (ex. background color)
  * Each component object has:
    * type: the type of the component (e.g., 'componentHero').
    * props: properties specific to that component.

You can use the components provided in src/components. If you desire, you can 
add your own components or change the existing ones.

Here is an example of the props that the component should accept:

```ts
const data = [
    {
        type: 'layoutSection',
        props: { ...layoutProps},
        components: [
            {
                type: 'componentHero',
                props: {...componentProps},
            },
        ],
    },
    {
        type: 'layoutSection',
        props: { ...layoutProps},
        components: [
            {
                type: 'componentItemsShowcase',
                props: {...componentProps},
            },
            {
                type: 'componentTrustBar',
                props: {...componentProps},
            },
        ],
    },
];

```

### Additional Requirements
You will have to complete all of these for your task to be considered done.

* Follow the eslint and prettier rules set by the project; you must not use any ts-ignore or disable eslint.
* It must contain a Readme.md file that has instructions on how to run the project as well as a brief explanation of how you have implemented these features. In the project, there is already a Readme.md file present feel free to override it completely.
* Your code must follow the latest rules and conventions
* You have to have checks for typescript and eslint that disallow you to commit any changes that cause errors.
* There should be no TypeScript or Eslint errors in your code.
* Feel free to add your own touch to these tasks
* Keep in mind that you will have to expand upon this solution in the technical interview


### Note: You can override this document
