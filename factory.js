function factory() {
    this.getInstance = () => {
        return new someClass();
    }
}

function someClass() {
}
someClass.prototype.name = 'someClass';