import { HTMLInputTypeAttribute, ReactNode } from 'react';

import { DevTool } from '@hookform/devtools';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { FieldValues, useForm } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { z } from 'zod';

import { Button } from '@homework-task/components/Button';

type FormGeneratorProps<T extends z.ZodSchema> = {
    apiEndpoint: string;
    formSchema: T;
    renderForm: (
        name: UseFormRegister<FieldValues>,
        errors: FieldErrors
    ) => ReactNode;
    className?: string;
    formTitle?: string;
    onSend: (state: { success?: string; error?: string }) => void;
};
const FormGenerator = <T extends z.ZodSchema>({
    apiEndpoint,
    formSchema,
    renderForm,
    className,
    formTitle,
    onSend,
}: FormGeneratorProps<T>) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    });

    return (
        <div
            className={clsx(
                'rounded',
                'bg-white',
                'outline',
                'outline-1',
                'outline-gray10',
                'p-2',
                className
            )}
        >
            {formTitle && (
                <div className="text-xl font-medium mb-2">{formTitle}</div>
            )}
            <form
                onSubmit={form.handleSubmit(
                    (payload: z.infer<typeof formSchema>) => {
                        fetch(apiEndpoint, {
                            method: 'POST',
                            body: JSON.stringify(payload),
                        })
                            .then((res) =>
                                res
                                    .json()
                                    .then(() =>
                                        onSend({ success: 'Form sent! :D' })
                                    )
                                    .catch(() =>
                                        onSend({ error: 'failed json? hmmm' })
                                    )
                            )
                            .catch(() =>
                                onSend({
                                    error: 'failed response(most likely)',
                                })
                            );
                    }
                )}
                className="flex flex-col gap-2"
            >
                {renderForm(form.register, form.formState.errors)}
                <Button type="submit" disabled={!form.formState.isValid}>
                    submit
                </Button>
            </form>
            <DevTool control={form.control} />
        </div>
    );
};
export default FormGenerator;

export function FormInput({
    fieldName,
    type,
    label,
    register,
    errors,
}: {
    fieldName: string;
    type: HTMLInputTypeAttribute | 'textarea';
    label?: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}) {
    return (
        <div className="flex flex-col gap-2 w-full">
            {type === 'textarea' ? (
                <textarea
                    className="outline outline-2 outline-gray10 rounded p-1"
                    placeholder={label}
                    autoComplete="off"
                    {...register(fieldName)}
                />
            ) : (
                <input
                    className="outline outline-2 outline-gray10 rounded p-1"
                    type={type}
                    placeholder={label}
                    autoComplete="off"
                    {...register(fieldName)}
                />
            )}
            <ErrorMessage
                errors={errors}
                name={fieldName}
                render={({ message }) => (
                    <p className="text-red text-sm w-full font-medium">
                        {message}
                    </p>
                )}
            />
        </div>
    );
}
