class Line{

    static IDEAL_NB_MODULES = 2;

    constructor(lineNum) {
        this.lineNum = lineNum;
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
        return $('#line-' + this.lineNum);
    }

    getLineNum(){
        return this.lineNum;
    }

    countModules(){
        return this.modules.length;
    }
}