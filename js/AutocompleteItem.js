let autocomplete_items = [];
let LAST_AUTOCOMPLETE_ID = 1;

function add_autocomplete_item(showName, inputID, data = {}){
    let _item = new AutocompleteItem(showName, data,  inputID);
    autocomplete_items.push(_item);
    return _item;
}

function get_good_autocomplete_data(inputID, writeValue){
    let _items = [];
    for(let i=0;i<autocomplete_items.length;i++){
        if(autocomplete_items[i] !== null && autocomplete_items[i].getInputID() === inputID){
            if(autocomplete_items[i].getShowName().toLowerCase().includes(writeValue.toLowerCase())){
                _items.push(autocomplete_items[i]);
            }
        }
    }
    return _items;
}

function get_autocomplete_item_by_id(id){
    for(let i=0;i<autocomplete_items.length;i++){
        if(autocomplete_items[i] !== null && autocomplete_items[i].getItemID() === id){
            return autocomplete_items[i];
        }
    }
    return null;
}

function autocomplete_item_load_from_json(json, showNameKey, inputID){

    for(let i=0;i<autocomplete_items.length;i++){
        if(autocomplete_items[i] !== null){
            if(autocomplete_items[i].getInputID() === inputID){
                return null; // des données sont déjà présentes pour ce champs, pas besoin de les récupérer à nouveau
            }
        }
    }

    let autocomplete_items_tmp = [];
    $.each(json, function(i, item) {
        let _newAr = JSON.parse(JSON.stringify(item));
        const _showName = _newAr[showNameKey];
        delete _newAr[showNameKey];
        const _finalItem = add_autocomplete_item(_showName, inputID, _newAr);
        autocomplete_items_tmp.push(_finalItem);
    });
    return autocomplete_items_tmp;
}

class AutocompleteItem{

    constructor(showName, data, inputID) {
        this.showName = showName;
        this.data = data;
        this.inputID = inputID;
        this.itemID = LAST_AUTOCOMPLETE_ID++;
    }

    getItemID(){
        return this.itemID;
    }

    getInputID(){
        return this.inputID;
    }

    getData(){
        return this.data;
    }

    getShowName(){
        return this.showName;
    }
}