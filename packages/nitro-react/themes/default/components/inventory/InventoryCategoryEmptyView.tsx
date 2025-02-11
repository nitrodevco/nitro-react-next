import { FC } from 'react';

export interface InventoryCategoryEmptyViewProps
{
    title: string;
    desc: string;
}

export const InventoryCategoryEmptyView: FC<InventoryCategoryEmptyViewProps> = props =>
{
    const { title = '', desc = '', ...rest } = props;

    return (
        <div className="grid h-full grid-cols-12 gap-2">
            <div className="flex flex-col col-span-5 items-center justify-center gap-1 overflow-hidden">
                <div className="inventory-empty-image" />
            </div>
            <div className="flex flex-col col-span-7 overflow-hidden justify-center">
                <span className="text-xl font-medium">{ title }</span>
                <span className="">{ desc }</span>
            </div>
        </div>
    );
};
