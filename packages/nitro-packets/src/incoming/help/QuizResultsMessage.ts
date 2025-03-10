import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type QuizResultsMessageType = {
    quizCode: string;
    questionIdsForWrongAnswers: number[];
};

export const QuizResultsMessage: IIncomingPacket<QuizResultsMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: QuizResultsMessageType = {
        quizCode: wrapper.readString(),
        questionIdsForWrongAnswers: [],
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.questionIdsForWrongAnswers.push(wrapper.readInt());

        count--;
    }

    return packet;
};
