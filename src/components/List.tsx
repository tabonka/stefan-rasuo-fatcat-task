import { ReactNode, useEffect, useState } from 'react';

import { z } from 'zod';

import { Skeleton } from '@homework-task/components/skeleton';

type ListProps<T extends z.ZodTypeAny> = {
    apiEndpoint: string;
    resSchema: T;
    cardContent: (data: z.infer<T>) => ReactNode;
};

const List = <T extends z.ZodTypeAny>({
    apiEndpoint,
    resSchema,
    cardContent,
}: ListProps<T>) => {
    const [error, setError] = useState<boolean>(false);
    const [listData, setListData] = useState<z.infer<T>[]>([]);

    useEffect(() => {
        if (apiEndpoint) {
            fetch(apiEndpoint, {
                method: 'GET',
            })
                .then((res) => {
                    res.json()
                        .then((data) => {
                            const parseData = z
                                .array(resSchema)
                                .safeParse(data);
                            if (parseData.success) {
                                setListData(parseData.data);
                                setError(false);
                            } else {
                                setError(true);
                            }
                        })
                        .catch(() => {
                            setError(true);
                        });
                })
                .catch(() => {
                    setError(true);
                });
        } else {
            setError(true);
        }
    }, [apiEndpoint, resSchema]);

    return listData.length > 0 ? (
        <div className="flex flex-row flex-wrap w-full h-full gap-4Username">
            {listData.map((item) => cardContent(item))}
        </div>
    ) : error ? (
        <>There was an error fetching data.</>
    ) : (
        <Skeleton className="h-12 w-12 rounded">Loading...</Skeleton>
    );
};

export default List;
