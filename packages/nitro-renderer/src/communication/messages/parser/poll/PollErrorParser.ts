import { IMessageDataWrapper, IMessageParser } from '#renderer/api';

export class PollErrorParser implements IMessageParser
{
    public flush(): boolean
    {
        throw true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        return true;
    }
}
