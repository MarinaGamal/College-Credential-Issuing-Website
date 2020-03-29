class Model {
    constructor(){
      this._data = {};
    }
  
    add(key, value){
      this._data[key] = value;
    }
  
    get(key){
      return this._data[key];
    }
    remove(key){
        delete this._data[key];
    }

    list(){
      //for(let i =0;i<this.data.length;i++){
        console.log(this.data);
      ///}
        
    }
}
  
const model = new Model();
Object.freeze(model);

module.exports = model;