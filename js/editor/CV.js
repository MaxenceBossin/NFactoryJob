class CV{
    static color = "#FFFFFF";

    static setColor(col){
        CV.color = col;
    }

    static getColor(){
        return CV.color;
    }

    static refresh(){
        const content = $('#cv .wrap_cv');
        content.css("background-color", this.color);
    }
}