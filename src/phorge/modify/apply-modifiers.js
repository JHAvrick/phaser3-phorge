const reservedMappings = ['objects'];
function applyModifiers(scene, modifiers, layout, objects){

    let final = {};
    modifiers.forEach((config) => {

        var artifact;
        if (config.scene){
            let modifier = config.scene.modifier || function(){};
            let prop = config.scene.prop;
            let mapping = reservedMappings.includes(config.scene.returns)
                            ? "unnamedArtifact"
                            : config.scene.returns;

            artifact = modifier(scene, layout[prop]);
            if (artifact != undefined)
                final[mapping] = artifact;
        }

        if (config.objects){

            let modifier = config.objects.modifier;
            let prop = config.objects.prop;
            layout.objects.forEach((config) => {
                let obj = objects[config.key];

                //If non-inclusive, only process objects that have the given prop
                if (config[prop] == null && !config.inclusive) 
                    return;

                modifier(scene, obj, config[prop], artifact);

            });
        }

    });


    return Object.assign({}, final, { objects: objects });
}

export default applyModifiers;