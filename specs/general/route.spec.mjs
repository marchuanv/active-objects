import { Route } from '../../lib/registry.mjs';
fdescribe('when-handling-routing-given-get-config-endpoint', () => {
    let response;
    beforeAll(async () => {
        const route_create = new Route({
            path: '/api/v1/config/create',
            content: JSON.stringify({
                className: 'HelloWorld',
                language: 'JavaScript',
                dependencyInjection: false
            }),
            token: process.env.GIT
        });
        await route_create.handle();
        const route_get = new Route({ path: '/api/v1/config/get', token: process.env.GIT });
        response = await route_get.handle();
    });
    it('should instruct get-config-endpoint to handle the request and return a success response', () => {
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
    });
});