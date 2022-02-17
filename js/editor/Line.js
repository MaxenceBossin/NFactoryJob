class Line{
    constructor(lineNum, maxModules, domElement) {
        this.lineNum = lineNum;
        this.maxModules = maxModules;
        this.domElement = domElement;
        this.modules = [];
    }

    addModule(module){
        this.modules.push(module);
    }

    removeModule(_module){
        if(_module === null){
            return;
        }
        for(let i=0;i<this.modules.length;i++){
            if(this.modules[i] !== null && this.modules[i].getModuleID() === _module.getModuleID()){
                this.modules.splice(i, 1);
                break;
            }
        }
    }

    getModules(){
        return this.modules;
    }

    getDOMElement(){
        return this.domElement;
    }

    getMaxModules(){
        return this.maxModules;
    }

    getLineNum(){
        return this.lineNum;
    }

    countModules(){
        return this.modules.length;
    }
}