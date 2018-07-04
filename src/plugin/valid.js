import { error, log } from "util";

const validRule = {
  isEmail(value, error){
    if(!/^(\w)+@(\w)+((\.\w+)+)$/.test(value)){
      return error;
    }
  },
  isNull(value, error){
    if(value === ''){
      return error;
    }
  },
  isMinLength(value, length, error){
    if(value.length < length){
      return error;
    }
  },
  isPattern(value, pattern, error){
    if(!pattern.test(value)){
      return error;
    }
  }
}

class validator {
  constructor(){
    this.valid = [];
  }
  add(value, rules){
    rules.forEach(rule=>{
      let args = [];
      let valid = validRule[rule.name]; 
      rule.allowed ? args = [ value, rule.allowed, rule.error ] : args = [ value, rule.error ];
      this.valid.push(() => valid.call(this, ...args));
    })
  }
  run(){
    for(let i = 0, fn; fn = this.valid[i++];){
      let errorMsg = fn();
      if(errorMsg){ return errorMsg };
    }
  }
}


export default function(){
  return new validator()
}