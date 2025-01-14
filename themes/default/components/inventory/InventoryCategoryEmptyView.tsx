import { FC } from 'react';

export interface InventoryCategoryEmptyViewProps
{
    title: string;
    desc: string;
}

export const InventoryCategoryEmptyView: FC<InventoryCategoryEmptyViewProps> = props =>
{
    const { title = '', desc = '', ...rest } = props;

    return null;

    /* return (
        <Grid { ...rest }>
            <Column center overflow="hidden" size={ 5 }>
                <div className="empty-image" />
            </Column>
            <Column justifyContent="center" overflow="hidden" size={ 7 }>
                <Text truncate fontSize={ 5 } fontWeight="bold" overflow="unset">{ title }</Text>
                <Text overflow="auto">{ desc }</Text>
            </Column>
            { children }
        </Grid>
    ); */
};
