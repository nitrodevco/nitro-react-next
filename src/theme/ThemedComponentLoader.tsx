import { ComponentType, FC, lazy, Suspense } from 'react';

export const ThemedComponentLoader: FC<{
    defaultComponent: ComponentType<any>;
    themedComponents: { [key: string]: () => Promise<unknown> }
}> = props =>
{
    const { defaultComponent = null, themedComponents = [] } = props;

    const ThemedComponent = lazy(() => themedComponents[0] ? themedComponents[0]() : Promise.resolve({ default: () => defaultComponent }));

    return (
        <Suspense fallback={ <div>Loading...</div> }>
            <ThemedComponent /> 
        </Suspense>
    );
};
