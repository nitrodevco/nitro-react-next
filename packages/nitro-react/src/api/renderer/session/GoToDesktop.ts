import { DesktopViewComposer } from '@nitrodevco/nitro-renderer';
import { SendMessageComposer } from '../SendMessageComposer';

export function GoToDesktop(): void
{
    SendMessageComposer(new DesktopViewComposer());
}
