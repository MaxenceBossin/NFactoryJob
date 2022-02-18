class Section{
    constructor(sectionNum, maxModules, domElement) {
        this.sectionNum = sectionNum;
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

    getSectionNum(){
        return this.sectionNum;
    }

    countModules(){
        return this.modules.length;
    }
}