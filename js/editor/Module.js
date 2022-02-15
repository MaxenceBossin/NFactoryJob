class Module{
    constructor(moduleID, moduleName) {
        this.moduleID = moduleID;
        this.moduleName = moduleName;
        this.section = null;
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

    getModuleName(){
        return this.moduleName;
    }
}