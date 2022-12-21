function factory() {
    this.getInstance = () => {
        return new ClassTest();
    }
     this.getAnotherInstance = () => {
        return 'second instance';
    }
}

function ClassTest() {
}
ClassTest.prototype.name = 'ClassTest';