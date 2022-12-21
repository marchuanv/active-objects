function factory() {
    this.getInstance = () => {
        return new ClassTest();
    }
}

function ClassTest() {
}
ClassTest.prototype.name = 'ClassTest';