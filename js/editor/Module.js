class Module{
    constructor(moduleID, moduleName, moduleShownName = '') {
        this.moduleID = moduleID;
        this.moduleName = moduleName;
        if(moduleShownName.length === 0){
            this.moduleShownName = moduleName;
        }
        else{
            this.moduleShownName = moduleShownName;
        }
        this.section = null;

        this.width = 50;
        this.data = [];
    }

    getData(){
        return this.data;
    }

    updateData(data){
        this.data = data;
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