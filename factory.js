function factory() {
    this.getInstance = () => {
        return new Bob();
    }
}

function Bob() {
}
Bob.prototype.name = 'Bob';