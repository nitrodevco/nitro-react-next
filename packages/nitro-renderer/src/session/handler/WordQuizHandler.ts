import { IConnection, IRoomHandlerListener } from '#renderer/api';
import { QuestionAnsweredEvent, QuestionEvent, QuestionFinishedEvent } from '#renderer/communication';
import { RoomSessionWordQuizEvent } from '#renderer/events';
import { EventStore } from '@nitrodevco/nitro-shared';
import { BaseHandler } from './BaseHandler';

export class WordQuizHandler extends BaseHandler
{
    constructor(connection: IConnection, listener: IRoomHandlerListener)
    {
        super(connection, listener);

        connection.addMessageEvent(new QuestionEvent(this.onQuestionEvent.bind(this)));
        connection.addMessageEvent(new QuestionAnsweredEvent(this.onQuestionAnsweredEvent.bind(this)));
        connection.addMessageEvent(new QuestionFinishedEvent(this.onQuestionFinishedEvent.bind(this)));
    }

    private onQuestionEvent(event: QuestionEvent): void
    {
        if (!this.listener) return;

        const session = this.listener.getSession(this.roomId);

        if (!session) return;

        const parser = event.getParser();

        if (!parser) return;

        const quizEvent = new RoomSessionWordQuizEvent(RoomSessionWordQuizEvent.QUESTION, session, parser.pollId);

        quizEvent.question = parser.question;
        quizEvent.duration = parser.duration;
        quizEvent.pollType = parser.pollType;
        quizEvent.questionId = parser.questionId;
        quizEvent.pollId = parser.pollId;

        EventStore.getState().emit(quizEvent);
    }

    private onQuestionAnsweredEvent(event: QuestionAnsweredEvent): void
    {
        if (!this.listener) return;

        const session = this.listener.getSession(this.roomId);

        if (!session) return;

        const parser = event.getParser();

        if (!parser) return;

        const quizEvent = new RoomSessionWordQuizEvent(RoomSessionWordQuizEvent.ANSWERED, session, parser.userId);

        quizEvent.value = parser.value;
        quizEvent.userId = parser.userId;
        quizEvent.answerCounts = parser.answerCounts;

        EventStore.getState().emit(quizEvent);
    }

    private onQuestionFinishedEvent(event: QuestionFinishedEvent): void
    {
        if (!this.listener) return;

        const session = this.listener.getSession(this.roomId);

        if (!session) return;

        const parser = event.getParser();

        if (!parser) return;

        const quizEvent = new RoomSessionWordQuizEvent(RoomSessionWordQuizEvent.FINISHED, session);
        quizEvent.questionId = parser.questionId;
        quizEvent.answerCounts = parser.answerCounts;

        EventStore.getState().emit(quizEvent);
    }
}
