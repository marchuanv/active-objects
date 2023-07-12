import { Container, Store } from '../../registry.mjs';
import utils from 'utils'
export class GetConfigEndpoint extends Container {
    constructor({ path, token }) {
        const filePath = 'active-object-config.json';
        super({
            path,
            store: {
                Store,
                ctorArgs: {
                    branchName: 'testing',
                    filePath,
                    token
                }
            },
            filePath,
            utils
        });
    }
    async matchPath() {
        const { path } = this.bag;
        const pathMatch = /\/api\/v1\/config\/get/g;
        return pathMatch.test(path);
    }
    async handle() {
        if ((await this.store.exists())) {
            let content = await this.store.read();
            if (content) {
                content = this.utils.getJSONObject(content);
                return {
                    contentType: 'application/json',
                    statusCode: 200,
                    statusMessage: '200 Success',
                    responseContent: this.utils.getJSONString({ message: 'Success', content })
                };
            } else {
                return {
                    contentType: 'application/json',
                    statusCode: 500,
                    statusMessage: '500 Internal Server Error',
                    responseContent: this.utils.getJSONString({ message: `${this.filePath} exists but no content was found` })
                };
            }
        } else {
            return {
                contentType: 'application/json',
                statusCode: 404,
                statusMessage: '404 Not Found',
                responseContent: this.utils.getJSONString({ message: `${this.filePath} was not found` })
            };
        }
    }
}
