function factory() {
    this.getInstance = () => {
        return new TestClass();
    }
}

function TestClass() {
}
TestClass.prototype.name = 'TestClass';