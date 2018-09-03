function fitContainer(id, game){
    var container = document.getElementById(id);

    const observer = new ResizeObserver((entries) => {
        let width = entries[0].contentRect.width;
        let height = entries[0].contentRect.height;
        game.resize(width, height);
    });

    observer.observe(container);
}

export default fitContainer;