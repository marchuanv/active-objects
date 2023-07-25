import { Container, Store } from './registry.mjs';
import utils from 'utils';
const users = new Map();
export class UserSession extends Container {
    constructor({ username, sessionAuthToken, hashedPassphrase, passphrase, storeAuthToken }) {
        const _username = username.toLowerCase();
        const filePath = `${_username}.json`;
        super({
            members: {
                username: {
                    value: _username
                },
                store: {
                    class: { Store },
                    args: {
                        filePath,
                        storeAuthToken
                    }
                },
                setup: {
                    args: {},
                    callback: async () => {
                        users.delete(_username);
                        const store = await this.store;
                        let content = await store.read();
                        content = utils.getJSONObject(content);
                        const { storedHashedPassphrase, storedHashedPassphraseSalt, storedDecryptionKey } = content[_username] || {};
                        if (storedHashedPassphrase && storedDecryptionKey && storedHashedPassphraseSalt) {
                            let sessionAuth = null;
                            if (sessionAuthToken) {
                                sessionAuth = utils.base64ToString(sessionAuthToken);
                                sessionAuth = utils.getJSONObject(sessionAuth);
                            }
                            users.set(_username, {
                                sessionAuth,
                                hashedPassphrase,
                                storedHashedPassphrase,
                                storedHashedPassphraseSalt,
                                storedDecryptionKey,
                                passphrase
                            });
                        }
                    }
                }
            }
        });
    }
    async register() {

    }
    async authenticate() {
        if (!(await this.isAuthenticated())) {
            const username = await this.username;
            const user = users.get(username);
            user.authenticated = false;
            const { hashedPassphrase, passphrase, storedHashedPassphrase, storedHashedPassphraseSalt, storedDecryptionKey } = user;
            if (passphrase && storedHashedPassphraseSalt && storedHashedPassphrase) {
                const _hashedPassphrase = utils.hashPassphrase(passphrase, storedHashedPassphraseSalt);
                if (_hashedPassphrase === storedHashedPassphrase) {
                    user.authenticated = true;
                }
            } else if (hashedPassphrase && storedHashedPassphrase && hashedPassphrase === storedHashedPassphrase) {
                user.authenticated = true;
            }
        }
        return await this.isAuthenticated();
    }
    async isAuthenticated() {
        const username = await this.username;
        const user = users.get(username);
        const { storedHashedPassphrase, storedDecryptionKey, userToken } = user;
        if (storedHashedPassphrase && storedDecryptionKey) {
            const decrypted = utils.decryptFromBase64Str(userToken, storedDecryptionKey, storedHashedPassphrase);
            if (decrypted.username === username && decrypted.hashPassphrase === storedHashedPassphrase) {
                return true;
            }
        }
        return false;
    }
}
