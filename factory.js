function factory() {
    this.getInstance = () => {
        return new ClassTest();
    }
}

function ClassTest() {
}
TestClass.prototype.name = 'ClassTest';