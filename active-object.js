const vm = require('vm');
const logging = require('./logging');
const utils = require('utils');
module.exports = ({ url, script }) => {
  const segments = url.split('/').map(x => x.toLowerCase()).filter(x=>x);
  let funcName;
  let context = {};
  vm.createContext(context);
  const functions = {
    isValidScript: () => {
      try {
        new vm.Script(script);
        return true;
      } catch(error) {
        logging.log({ error });
        logging.log({ info: error.message });
        logging.log({ info: error.stack });
        return false;
      } 
    },
    activate: () => {
      vm.runInNewContext(script, context);
      logging.log(`CONTEXT: ${context}`);
      funcName = Object.keys(context)[0];
    },
    call: async (input) => {
      try {
        const func = context[funcName];
        if (!func) {
          throw new Error(`the function ${func.name} does not exist for the context`);
        }
        if (func.constructor) {
          let instance = new func(input);
          let instanceMemberNames = Object.keys(instance);
          for(const segName of segments) {
            const memberFuncName = instanceMemberNames.find(x => x.toLowerCase().replace(/^\s*$/,'') === segName.toLowerCase().replace(/^\s*$/,''));
            if (memberFuncName) {
              const memberFunc = instance[memberFuncName];
              instance = await memberFunc(input);
              if (Object.keys(context).find(x => x ===  instance.constructor.name)) {
                instanceMemberNames = Object.keys(instance);
              }
              output = instance;
            }
          };
        } else {
          output = await func(input)
        }
        return output;
      } catch (error) {
        logging.log({ error });
        logging.log({ info: error.message });
        logging.log({ info: error.stack });
        return {
          message: error.message,
          stack: error.stack
        };
      }
    }
  };
  return functions;
}