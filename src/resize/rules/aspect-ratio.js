export default function(scene, target, aspectRatio) {

    var ratio;
    if (aspectRatio.toLowerCase() === 'original'){

        ratio = target.height / target.width;

    } else {

        let aspect = aspectRatio.split(":");
        ratio = parseInt(aspect[1]) / parseInt(aspect[0]);

    }

    target.displayHeight = target.displayWidth * ratio;
    
}