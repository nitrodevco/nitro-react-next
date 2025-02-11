import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { QuizDataMessageParser } from '../../parser';

export class QuizDataMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, QuizDataMessageParser);
    }

    public getParser(): QuizDataMessageParser
    {
        return this.parser as QuizDataMessageParser;
    }
}
