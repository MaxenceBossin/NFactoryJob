class Module{
    constructor(moduleID, moduleName) {
        this.moduleID = moduleID;
        this.moduleName = moduleName;
        this.moduleShownName = moduleName;
        this.section = null;

        this.width = 50;
    }

    setSection(section){
        this.section = section;
    }

    getSection(){
        return this.section;
    }

    getModuleID(){
        return this.moduleID;
    }

    setModuleShownName(_name){
        this.moduleShownName = _name;
    }

    getModuleName(){
        return this.moduleName;
    }

    getModuleShownName(){
        return this.moduleShownName;
    }

    getWidth(){
        return this.width;
    }

    setWidth(_width){
        this.width = _width;
    }
}