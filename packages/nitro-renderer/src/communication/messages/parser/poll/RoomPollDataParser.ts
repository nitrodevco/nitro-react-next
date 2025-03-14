import { IMessageDataWrapper, IMessageParser } from '#renderer/api';

export class RoomPollDataParser implements IMessageParser
{
    private _question: string;
    private _choices: string[];

    public flush(): boolean
    {
        this._question = null;
        this._choices = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._question = wrapper.readString();
        this._choices = [];

        const totalChoices = wrapper.readInt();
        let total = 0;

        while (total < totalChoices)
        {
            this._choices.push(wrapper.readString());
            total++;
        }

        return true;
    }

    public get question(): string
    {
        return this._question;
    }

    public get choices(): string[]
    {
        return this._choices.slice();
    }
}
