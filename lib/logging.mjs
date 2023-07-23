let _logs = [];
process.on("exit", () => {
    console.clear();
    _logs = _logs.sort((x,y) => x.date.getTime() - y.date.getTime());
    const contexts = [...new Set(_logs.map(x => x.context))];
    for(const context of contexts) {
        console.log('\r\n');
        console.log(`-> ${context}`)
        for(const { date, message, error } of _logs.filter(x => x.context === context)) {
            let text = '';
            if (message) {
                text = JSON.stringify({ date, message });
            } else if (error) {
                text = JSON.stringify({ date, error });
            }
            console.log(`->     ${text}`);
        }
    }
});
export class Logging {
    constructor({ contextId }) {
        this.contextId = contextId;
    }
    log(message) {
        _logs.push({ context: this.contextId, date: new Date(), message });
    }
}