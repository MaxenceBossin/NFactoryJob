
let icons_count = 0;
const icons_loaded_by_page = 200;

// Général
function refresh_general_content(){
    let _input;
    content_module.css("display", "none");
    content_general.empty();
    content_general.css("display", "flex");

    _input = create_input('cv-title', 'Nom du CV', content_general, 'text', [CV.getTitle()]);
    _input.on('input change', function(){
        CV.setTitle($(this).val());
        CV.refresh();
        editor_request_save();
    });

    const table = $('<table class="section-table"></table>');
    table.append($('<thead><tr><th></th><th></th></tr></thead>'));
    const tbody = $('<tbody></tbody>');
    let foundLine = false;
    for(let i=0;i<lines_el.length;i++){
        if(lines_el[i] != null){
            foundLine = true;
            const tr = $('<tr></tr>');
            let td = $('<td></td>');
            const delete_line = $('<i data-section="'+lines_el[i].getLineNum()+'" class="fa-solid fa-trash"></i>').on('click', function(){
                const lineID = $(this).attr('data-section');
                const _line = get_line_by_num(parseInt(lineID));
                if(_line !== null){
                    destroy_section(_line);
                }
            });
            td.append($('<p>Section '+lines_el[i].getLineNum()+'</p>'));
            if(lines_el[i].getLineNum() > 1 && lines_el[i].countModules() > 0){
                td.append(delete_line);
            }
            tr.append(td);
            td = $('<td></td>');
            const _modules = lines_el[i].getModules();
            let moduleFound = false;
            if(_modules != null && _modules.length > 0){
                for(let _mod = 0;_mod<_modules.length;_mod++){
                    if(_modules[_mod] !== null && _modules[_mod] !== undefined){
                        td.append($('<button>'+_modules[_mod].getModuleName()+'</button>'));
                        const delete_module = $('<i data-mod="'+_modules[_mod].getModuleID()+'" class="fa-solid fa-trash"></i>').on('click', function(){
                            const modID = $(this).attr('data-mod');
                            const _module = get_module_by_ID(parseInt(modID));
                            if(_module !== null){
                                destroy_module(_module);
                            }
                        });
                        td.append(delete_module);
                        moduleFound = true;
                    }
                }
            }
            if(!moduleFound){
                td.append($('<p>Aucun module dans cette section</p>'));
            }
            tr.append(td);
            tbody.append(tr);
        }
    }
    table.append(tbody);
    content_general.append(table);

    if(!foundLine){
        tbody.append($('<tr><td>Commencez à ajouter vos modules. Ils apparaîtront ici !</td></tr>'));
    }

    _input = create_input('back-color', 'Couleur de fond du CV', content_general, 'colorpicker', [CV.getColor()]);
    _input.on('input change', function(){
        CV.setColor($(this).val());
        CV.refresh();
        editor_request_save();
    });

    if(LOGGED !== 1) {
        content_general.append($('<p>Profitez de toutes les fonctionnalités de l\'éditeur et d\'une personnalisation complète de votre CV en créant un compte gratuitement !</p>'));
        content_general.append($('<button class="btn blue" id="create-account">Créer un compte</button>').on('click', function () {
            window.location.href = SIGNUP_URL;
        }));
    }

    const previewBtn = $('<button class="btn green">Prévisualiser</button>').on('click', function(){
        if(generating_pdf){
            return;
        }
        generating_pdf = true;
        preview_mode = true;
        const preview = $('#preview-infos');
        $('#preview-infos .content').empty();
        preview.css("display", "block");
        append_preview('Prévisualisation de', false, true);
        setTimeout(function(){
            preview_save = $('#cv .wrap_cv .modules').clone();
            const element = preview_save.clone();
            $('#cv .wrap_cv .modules').remove();
            element.find('.draggable, .module.add, #add-line, .add-item, form, .line-title').each(function() {
                $(this).remove();
            });
            element.find('.module.selected').each(function() {
                $(this).removeClass('selected');
            });
            $('#cv .wrap_cv').append(element);
            append_preview('Prévisualisation générée', true);
            $('#save-notif').css("display", "none");
            $('#onglet_editor').css("display", "none");
            quit_preview.css("bottom", "10px");
            setTimeout(function(){
                generating_pdf = false;
                preview.fadeOut('fast', function(){
                    preview.css("display", "none");
                });
            }, 800);
        }, 800);

    });
    content_general.append(previewBtn);

    const expdfBtn = $('<button class="btn red">Exporter en PDF</button>').on('click', function(){
        if(generating_pdf){
            return;
        }
        generating_pdf = true;
        preview_mode = true;
        const preview = $('#preview-infos');
        $('#preview-infos .content').empty();
        preview.css("display", "block");
        append_preview('Prévisualisation du CV', false, true);
        setTimeout(function(){
            const save = $('#cv .wrap_cv .modules').clone();
            const element = save.clone();
            $('#cv .wrap_cv .modules').remove();
            element.find('.draggable, .module.add, #add-line, .add-item, form, .line-title').each(function() {
                $(this).remove();
            });
            element.find('.module.selected').each(function() {
                $(this).removeClass('selected');
            });
            $('#cv .wrap_cv').append(element);
            append_preview('Génération du CV', false, true);
            setTimeout(function(){
                let filename = CV.getTitle().replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf';
                let options = {
                    filename:     filename,
                    image:        { type: 'jpg', quality: 0.95 },
                    jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait' },
                    html2canvas: {
                        dpi: 300,
                        letterRendering: true,
                        useCORS: true
                    }
                };
                html2pdf().set(options).from(document.getElementById('cv')).save();
                append_preview('Mise à jour de l\'éditeur...');
                setTimeout(function(){
                    $('#cv .wrap_cv .modules').remove();
                    $('#cv .wrap_cv').append(save);
                    append_preview('Exportation terminée de', true, true);
                    setTimeout(function(){
                        refresh_all_modules();
                        modules = $('#cv .modules');
                        place_add_module();
                        generating_pdf = false;
                        preview_mode = false;
                        preview.fadeOut('fast', function(){
                            preview.css("display", "none");
                        });
                    }, 1500);
                }, 800);
            }, 800);
        }, 800);

    });
    content_general.append(expdfBtn);
}

function append_preview(texte, appendTick = false, appendCVName = false){
    const preview = $('#preview-infos .content');
    let previewText;
    if(appendTick){
        if(appendCVName){
            previewText = $('<p>'+texte+' <strong>'+CV.getTitle()+'</strong></p>');
        }
        else{
            previewText = $('<p>'+texte+'</p>');
        }
    }
    else{
        if(appendCVName){
            previewText = $('<p>'+texte+' <strong>'+CV.getTitle()+'</strong>...</p>');
        }
        else{
            previewText = $('<p>'+texte+'...</p>');
        }
    }
    preview.append(previewText);
    previewText.hide().fadeIn(500);
    if(appendTick){
        const i = $('<i class="fa-solid fa-check"></i>');
        previewText.append(i);
        i.fadeOut('fast');
        i.fadeIn('fast');
    }
}

// Module
function refresh_module_content(){
    content_general.css("display", "none");
    content_module.empty();
    content_module.css("display", "flex");
    if(selected_module === null){
        return;
    }

    icons_count = 0;

    content_module.append($('<h1>'+selected_module.getModuleName()+'</h1>'));

    if(selected_module.getModuleName() === "Module personnalisé"){
        create_input('nom_module', 'Nom du module', content_module, 'text', [selected_module.getModuleShownName()]).on('input', function(){
            const _module = get_selected_module();
            if(_module != null){
                _module.setModuleShownName($(this).val());
            }
            _module.refresh();
            editor_request_save();
        });
    }

    let _input;

    create_input('showtitle', 'Afficher le titre', content_module, 'checkbox', [selected_module.getShowTitle()]).on('input', function(){
        const checked = $(this).prop('checked');
        selected_module.setShowTitle(checked);
        selected_module.refresh();
        editor_request_save();
    });

    create_input('largeur', 'Largeur du module', content_module, 'slider', [selected_module.getLargeur(), 20, 100, '%']).on('input', function(){
        selected_module.setLargeur(parseInt($(this).val()));
        selected_module.refresh();
        editor_request_save();
    });

    if(selected_module.getModuleName() === 'Image'){
        create_input('image', 'URL de l\'image', content_module, 'text', [selected_module.getProfilePic()], 'https://').on('input', function(){
            selected_module.setProfilePic($(this).val());
            selected_module.refresh();
            editor_request_save();
        });

        create_input('icon-size', 'Taille de l\'image', content_module, 'slider', [selected_module.getIconSize(), 10, 100, '%']).on('input', function(){
            selected_module.setIconSize(parseInt($(this).val()));
            selected_module.refresh();
            editor_request_save();
        });

        create_input('icon-radius', 'Contours de l\'image', content_module, 'slider', [selected_module.getIconRadius(), 0, 50, '%']).on('input', function(){
            selected_module.setIconRadius(parseInt($(this).val()));
            selected_module.refresh();
            editor_request_save();
        });
    }

    if(selected_module.getModuleName() === "Icône"){
        create_input('icon-size', 'Taille de l\'icône', content_module, 'slider', [selected_module.getIconSize(), 10, 100, '%']).on('input', function(){
            selected_module.setIconSize(parseInt($(this).val()));
            selected_module.refresh();
            editor_request_save();
        });
    }

    _input = create_input('back_module_' + selected_module.getModuleID(), 'Couleur de fond du module', content_module, 'colorpicker', [selected_module.getColor()]);
    _input.on('input change', function(){
        selected_module.setColor($(this).val());
        selected_module.refresh();
        editor_request_save();
    });

    _input = create_input('fontcolor_module_' + selected_module.getModuleID(), 'Couleur du texte du module', content_module, 'colorpicker', [selected_module.getFontColor()]);
    _input.on('input change', function(){
        selected_module.setFontColor($(this).val());
        selected_module.refresh();
        editor_request_save();
    });

    create_input('separator-size', 'Taille du séparateur', content_module, 'slider', [selected_module.getSeparatorSize(), 0, 15, 'px']).on('input', function(){
        selected_module.setSeparatorSize(parseInt($(this).val()));
        selected_module.refresh();
        editor_request_save();
    });

    create_input('separator-radius', 'Contours du séparateur', content_module, 'slider', [selected_module.getSeparatorRadius(), 0, 10, 'px']).on('input', function(){
        selected_module.setSeparatorRadius(parseInt($(this).val()));
        selected_module.refresh();
        editor_request_save();
    });

    _input = create_input('separator_module_' + selected_module.getModuleID(), 'Couleur du séparateur', content_module, 'colorpicker', [selected_module.getSeparatorColor()]);
    _input.on('input change', function(){
        selected_module.setSeparatorColor($(this).val());
        selected_module.refresh();
        editor_request_save();
    });

    create_input('border-top', 'Bord haut', content_module, 'slider', [selected_module.getBorderTop(), 0, 20, 'px']).on('input', function(){
        selected_module.setBorderTop(parseInt($(this).val()));
        selected_module.refresh();
        editor_request_save();
    });

    create_input('border-bottom', 'Bord bas', content_module, 'slider', [selected_module.getBorderBottom(), 0, 20, 'px']).on('input', function(){
        selected_module.setBorderBottom(parseInt($(this).val()));
        selected_module.refresh();
        editor_request_save();
    });

    create_input('border-left', 'Bord gauche', content_module, 'slider', [selected_module.getBorderLeft(), 0, 20, 'px']).on('input', function(){
        selected_module.setBorderLeft(parseInt($(this).val()));
        selected_module.refresh();
        editor_request_save();
    });

    create_input('border-right', 'Bord droit', content_module, 'slider', [selected_module.getBorderRight(), 0, 20, 'px']).on('input', function(){
        selected_module.setBorderRight(parseInt($(this).val()));
        selected_module.refresh();
        editor_request_save();
    });

    create_input('border-radius', 'Contour des bords', content_module, 'slider', [selected_module.getBorderRadius(), 0, 10, 'px']).on('input', function(){
        selected_module.setBorderRadius(parseInt($(this).val()));
        selected_module.refresh();
        editor_request_save();
    });

    _input = create_input('mode-affichage', 'Mode d\'affichage', content_module, 'select', ['Vertical', 'Horizontal']).on('input', function(){
        let _idx = $(this).prop('selectedIndex');
        if(_idx == 0){
            $(this).prop('selectedIndex', 1);
            _idx = 1;
        }
        selected_module.setModeAffichage(_idx - 1);
        selected_module.refresh();
        editor_request_save();
    });
    set_selectinput_index(_input, selected_module.getModeAffichage() + 1);

    let _polices = [];
    for(let i=0;i<fonts.length;i++){
        _polices.push(fonts[i].family);
    }

    create_input('police', 'Police d\'écriture', content_module, 'select', _polices).on('input', function(){
        load_font($(this).val());
        selected_module.setFont($(this).val());
        selected_module.refresh();
        editor_request_save();
    });

    const icon_list = $('<div class="icon-list"></div>');
    let loaded_icons = 0;

    for (const [key, value] of Object.entries(icons)) {
        if(value.hasOwnProperty('free') && value.free !== null && value.free.length > 0){
            icon_list.append($('<i class="fa-'+value.free[0]+' fa-'+key+'"></i>').on('click', function(){
                selected_module.setIcon($(this).attr('class'));
                selected_module.refresh();
                editor_request_save();
            }));
            loaded_icons++;
            if(loaded_icons >= icons_loaded_by_page){
                break;
            }
        }
    }

    icons_count += loaded_icons;

    if(icons_count < Object.keys(icons).length){
        icon_list.append($('<button class="btn blue">Afficher plus</button>').on('click', function(){
            add_icons($(this));
        }));
    }

    content_module.append(icon_list);
}

function add_icons(btn){
    let loaded_icons = 0;
    let actual_count = 0;
    if(icons_count < Object.keys(icons).length) {
        for (const [key, value] of Object.entries(icons)) {
            if (actual_count < icons_count) {
                actual_count++;
            } else {
                if (value.hasOwnProperty('free') && value.free !== null && value.free.length > 0) {
                    btn.before($('<i class="fa-' + value.free[0] + ' fa-' + key + '"></i>').on('click', function () {
                        selected_module.setIcon($(this).attr('class'));
                        selected_module.refresh();
                        editor_request_save();
                    }));
                    loaded_icons++;
                    if (loaded_icons >= icons_loaded_by_page) {
                        break;
                    }
                }
            }
        }
    }

    icons_count += loaded_icons;

    if(icons_count >= Object.keys(icons).length){
        btn.remove();
    }
}

function load_font(fontName){

    let _data = document.querySelectorAll('link[href$="https://fonts.googleapis.com/css2?family='+fontName+':wght@300;400;700"]');
    if(_data !== null && _data.length > 0){
        return;
    }

    var link = document.createElement( "link" );
    link.href = 'https://fonts.googleapis.com/css2?family='+fontName+':wght@300;400;700';
    link.type = "text/css";
    link.rel = "stylesheet";

    document.getElementsByTagName( "head" )[0].appendChild( link );
}