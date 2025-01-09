export const CloneObject = <T>(object: T): T =>
{
    if ((object == null) || ('object' != typeof object)) return object;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const copy = new object.constructor();

    for (const attr in object)
    {
        if (Object.prototype.hasOwnProperty.call(object, attr)) copy[attr] = object[attr];
    }

    return copy;
};
