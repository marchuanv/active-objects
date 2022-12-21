function factory() {
    this.getInstance = () => {
        return new ClassTest();
    }
}

function ClassTest() {
    getMessage = () => {
        return 'Hello World';
    }
}
ClassTest.prototype.name = 'ClassTest';