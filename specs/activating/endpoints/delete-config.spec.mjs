import {
    Logging,
    Store,
    GithubBranch,
    Github,
    GithubFile,
    DeleteConfig,
    Container
} from '../../../lib/index.mjs';
describe('when-activating-delete-config-endpoint', () => {
    const container = new Container();
    beforeAll(() => {
        container.register(Github);
        container.register(Logging);
        container.register(GithubBranch);
        container.register(GithubFile);
        container.register(Store);
        container.register(DeleteConfig);
    });
    it('should create an instance', () => {
        const { instance } = container.get('$deleteConfig');
        expect(instance).toBeInstanceOf(DeleteConfig);
    });
});