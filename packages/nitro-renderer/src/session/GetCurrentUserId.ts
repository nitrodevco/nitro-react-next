import { SessionStore } from '@nitrodevco/nitro-shared-storage';

export const GetCurrentUserId = () => SessionStore.getState().userId;
