# Homework task

## Install Process

- Install and use node version **18.x**
- `npm run install -ci`
- Install [Prettier](https://prettier.io/docs/en/install.html#set-up-your-editor) extension for your editor of choice


**Requirement:** Enable `eslint --fix` and `run prettier` in your editor of choice (preferably run them on save)

### Manual commands for linting

``npm run lint && npm run typecheck``


### Run Development Server

``vite --port 3000`` or just ``npm run dev``

### Run Production Preview Server

``vite build && vite preview`` or ``npm run build && npm run preview``

___

## Task solutions

### Typescript convertion
Project in its entirety has been converted to use typescript using strict typing and linting.

Implemented module import alias ``@homework-task``.

### Generic List Component <sub>creatively named ``List``</sub>

### Features

- Api response parsing based on the provided ZodSchema
```
res.json()
    .then((data) => {
        const parseData = z
            .array(resSchema) // resSchema is a prop
            .safeParse(data);
        if (parseData.success) {
            setListData(parseData.data);
            setError(false);
        } else {
            setError(true);
        }
    })
  ```
- Dynamic templating via callback function
```
const templateExamle = (user: z.infer<typeof userSchema>) => (
    <div key={user.id}>
            #{user.id} - {user.name}
    </div>
);
```
- Component has three states visually: Loading, Loaded and error

#### Usage

```
<List
    apiEndpoint="yourApiUrlHere"
    resSchema={yourZodSchemaHere}
    cardContent={yourTemplateHere}
    className="thePrettyClassesHere"
/>
```

#### Params

```
apiEndpoint - The absolute url from which data will be fetched.
resSchema - resSchema accepts any valid Zod schema and is used to parse the api response data.
cardContent: - The function that accepts the api response data and return a ReactNode, 
               so the dev can style and structure the content freely.
```

### Form generator component

The form generator is a component that achieves ease of use by over-engineering. :D

### Features

- **Dynamic validation**: Accepts any ZodSchema and uses it for form validation ``formSchema``
- **Dynamic structuring**: Structure input fields freely by making a callback function ``renderForm``
- **Custom form input**: Honestly I don't remmember why I did this, but atleast it has error handling built-in :D
```
const formContentExample = (
        register: UseFormRegister<FieldValues>,
        errors: FieldErrors
    ) => {
        return (
            <>
                <FormInput
                    fieldName="title"
                    type="text"
                    label="the title"
                    register={register}
                    errors={errors}
                />
                <FormInput
                    fieldName="body"
                    type="textarea"
                    label="the body"
                    register={register}
                    errors={errors}
                />
            </>
        );
    };
```

### Basic usage

- Create the form generator
```
<FormGenerator
    formTitle="YourTitlehere"
    className="TheCssHerePlease"
    apiEndpoint="YourApiUrlHere"
    formSchema={YourFormSchemaHere}
    renderForm={YourFormTemplateHere}
    onSend={HandleTheResulthere}
/>
```

- Create form that will be binded to the form generator
```
const formContentExample = (
        register: UseFormRegister<FieldValues>,
        errors: FieldErrors
    ) => {
        return (
            <FormInput
                fieldName="title"
                type="text"
                label="the title"
                register={register}
                errors={errors}
            />
        );
    };
```

### Page generator

To be done..