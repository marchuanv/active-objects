function factory() {
    this.getInstance = () => {
        return new ClassTest();
    }
}

function ClassTest() {
    this.getMessage = () => {
        return 'Hello World';
    }
}
ClassTest.prototype.name = 'ClassTest';