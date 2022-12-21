function Factory() {
    this.getInstance = () => {
        return new ClassTest();
    }
    this.getMessage = () => {
        return 'hello world from Factory';
    }
}

function ClassTest() {
    this.getMessage = () => {
        return 'hello world from ClassTest';
    }
}
ClassTest.prototype.name = 'ClassTest';