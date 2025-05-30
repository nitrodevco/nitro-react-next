import { IAdvancedMap, IMessageDataWrapper, IMessageParser } from '#renderer/api';
import { AdvancedMap } from '#renderer/utils';

export class UnseenItemsParser implements IMessageParser
{
    private _items: IAdvancedMap<number, number[]>;

    public flush(): boolean
    {
        this._items = new AdvancedMap();

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if (!wrapper) return false;

        let totalUnseen = wrapper.readInt();

        while (totalUnseen > 0)
        {
            const category = wrapper.readInt();

            let totalItems = wrapper.readInt();
            const itemIds: number[] = [];

            while (totalItems > 0)
            {
                itemIds.push(wrapper.readInt());

                totalItems--;
            }

            this._items.add(category, itemIds);

            totalUnseen--;
        }

        return true;
    }

    public getItemsByCategory(category: number): number[]
    {
        return this._items.getValue(category);
    }

    public get categories(): number[]
    {
        return this._items.getKeys();
    }
}
