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