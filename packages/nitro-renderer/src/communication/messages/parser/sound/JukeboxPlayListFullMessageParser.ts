import { IMessageDataWrapper, IMessageParser } from '#renderer/api';

export class JukeboxPlayListFullMessageParser implements IMessageParser
{
    flush(): boolean
    {
        return true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        return true;
    }
}
