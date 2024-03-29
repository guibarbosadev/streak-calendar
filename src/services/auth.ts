import { TOAuthProvider } from '@models/auth';
import { IUser } from '@models/user';
import { apiClient } from '@services/base';

export type LoginParams = {
    provider: TOAuthProvider;
    idToken: string;
};

class AuthService {
    async login(credentials: LoginParams) {
        const { provider, idToken } = credentials;
        const URL = '/login';
        const body = { provider, idToken };

        const { data: user } = await apiClient.post<IUser>(URL, body);

        return user;
    }

    async logout() {
        const URL = '/logout';
        await apiClient.post<void>(URL);

        return;
    }

    async fetchLoggedInUser() {
        const URL = '/profile';
        const response = await apiClient.get<{ user: IUser }>(URL);
        const { user } = response.data;

        if (!user._id) throw new Error('');

        return user;
    }
}

export const authService = new AuthService();
