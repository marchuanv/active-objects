import { Container } from '../../lib/registry.mjs';
class ContainerTestDependency {
    constructor({ someArg }) {
        this.someArg = someArg;
    }
    doSomething() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 500);
        });
    }
}
class ContainerTest extends Container {
    constructor() {
        super({
            members: {
                containerTestDependency: {
                    class: { ContainerTestDependency },
                    args: {
                        someArg: 'Hello World'
                    }
                },
                finished: {
                    value: false
                },
                someFunc: {
                    callback: () => {
                        return new Promise((resolve) => {
                            setTimeout(async () => {
                                const logging = await this.logging;
                                await logging.log('create delay');
                                this.finished = true;
                                resolve();
                            }, 1000);
                        });
                    },
                    args: {}
                }
            }
        });
    }
    async doSomething() {
        const containerTestDependency = await this.containerTestDependency;
        await containerTestDependency.doSomething();
    }
}
describe('when-regestering-classes', () => {
    let finished = false;
    beforeAll(async () => {
        const containerTest = new ContainerTest();
        await containerTest.doSomething();
        finished = await containerTest.finished;
    });
    it('should wait for constructor async operations to finish', () => {
        expect(finished).toBeTrue();
    });
});