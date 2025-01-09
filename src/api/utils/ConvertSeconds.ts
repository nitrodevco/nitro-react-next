export const ConvertSeconds = (seconds: number) =>
{
    const numDays = Math.floor(seconds / 86400);
    const numHours = Math.floor((seconds % 86400) / 3600);
    const numMinutes = Math.floor(((seconds % 86400) % 3600) / 60);
    const numSeconds = ((seconds % 86400) % 3600) % 60;

    return numDays.toString().padStart(2, '0') + ':' + numHours.toString().padStart(2, '0') + ':' + numMinutes.toString().padStart(2, '0') + ':' + numSeconds.toString().padStart(2, '0');
};
