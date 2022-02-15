class Module{
    constructor(moduleID, moduleName, moduleElement) {
        this.moduleID = moduleID;
        this.moduleName = moduleName;
        this.moduleElement = moduleElement;
    }
    
    getModuleElement(){
        return this.moduleElement;
    }

    getModuleID(){
        return this.moduleID;
    }

    getModuleName(){
        return this.moduleName;
    }
}