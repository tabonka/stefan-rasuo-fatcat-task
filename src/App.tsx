import '@homework-task/styles.css';

import { FieldValues } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastOptions } from 'react-toastify/dist/types';
import { z } from 'zod';

import FormGenerator, {
    FormInput,
} from '@homework-task/components/FormGenerator';
import { Landing } from '@homework-task/components/landing/Landing';
import List from '@homework-task/components/List';

export default function App() {
    const userSchema = z.object({
        id: z.number(),
        name: z.string(),
        username: z.string(),
        email: z.string().email('invalid mail'),
    });

    const formSchema = z.object({
        title: z
            .string()
            .min(6, { message: 'Potrebno je barem 6 karaktera' })
            .max(16, { message: 'Maksimalno je 16 karaktera' }),
        body: z
            .string()
            .min(1, { message: 'Obavezno je polje' })
            .max(110, { message: 'Maksimalno je 110 karaktera' }),
    });
    const cardContent = (user: z.infer<typeof userSchema>) => (
        <div
            className="flex flex-col p-2 shadow outline-2 outline-gray10 rounded"
            key={user.id}
        >
            <div className="flex flex-row font-medium text-lg mb-2">
                #<span>{user.id}</span>-<span>{user.name}</span>
            </div>
            <span>
                <span className="font-medium">Username:</span> {user.username}
            </span>
            <span>
                <span className="font-medium">email:</span> {user.email}
            </span>
        </div>
    );

    const formContent = (
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

    return (
        <main>
            <List
                className="m-2"
                apiEndpoint="https://jsonplaceholder.typicode.com/users"
                resSchema={userSchema}
                cardContent={cardContent}
            />
            <FormGenerator
                formTitle="Formular"
                className="m-2 max-w-[600px]"
                apiEndpoint="https://jsonplaceholder.typicode.com/posts"
                formSchema={formSchema}
                renderForm={formContent}
                onSend={(response) => {
                    aToast(response);
                }}
            />
            <Landing />
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </main>
    );
}

function aToast(state: { success?: string; error?: string }) {
    const toastMessageConf: ToastOptions = {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    };
    if (state.success) {
        toast.success(state.success, toastMessageConf);
    } else {
        toast.error(state.error, toastMessageConf);
    }
}
