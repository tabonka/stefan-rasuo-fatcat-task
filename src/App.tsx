import '@homework-task/styles.css';
import { z } from 'zod';

import { Landing } from '@homework-task/components/landing/Landing';
import List from '@homework-task/components/List';

export default function App() {
    const userSchema = z.object({
        id: z.number(),
        name: z.string(),
        username: z.string(),
        email: z.string().email('invalid mail'),
    });

    const cardContent = (data: z.infer<typeof userSchema>) => (
        <div className="flex flex-col p-2 shadow rounded">
            <div className="flex flex-row font-medium text-lg mb-2">
                #<span>{data.id}</span>-<span>{data.name}</span>
            </div>
            <span>
                <span className="font-medium">Username:</span> {data.username}
            </span>
            <span>
                <span className="font-medium">email:</span> {data.email}
            </span>
        </div>
    );

    return (
        <main>
            <List
                apiEndpoint="https://jsonplaceholder.typicode.com/users"
                resSchema={userSchema}
                cardContent={cardContent}
            />
            <Landing />
        </main>
    );
}
