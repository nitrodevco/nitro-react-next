import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type QuizDataMessageType = {
    quizCode: string;
    questionIds: number[];
};

export const QuizDataMessage: IIncomingPacket<QuizDataMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: QuizDataMessageType = {
        quizCode: wrapper.readString(),
        questionIds: [],
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.questionIds.push(wrapper.readInt());

        count--;
    }

    return packet;
};
