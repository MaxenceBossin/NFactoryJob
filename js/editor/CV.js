class CV{
    static color = "#FFFFFF";
    static title = "Mon premier CV";

    static setColor(col){
        CV.color = col;
    }

    static getColor(){
        return CV.color;
    }

    static setTitle(_name){
        CV.title = _name;
    }

    static getTitle(){
        return CV.title;
    }

    static refresh(){
        const content = $('#cv .wrap_cv');
        content.css("background-color", CV.color);

        document.title = 'CV - ' + CV.title;
    }
}