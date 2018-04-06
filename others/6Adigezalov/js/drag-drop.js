const dragDrop = {
    init() {
        this.createDragDrop();
    },

    createDragDrop () {
        $('.product').draggable({
            helper: 'clone',
            revert: 'invalid'
        });
        $('.header__cart').droppable({
            activeClass: 'activeDrop',
            hoverClass: 'hoverDrop',
            tolerance: 'touch',
            opacity: 0.1,
            over: function (event, ui) {
                let clone = ui.draggable.clone();
                clone.prevObject.find('.add_to_cart').click();
            }
        });
    }
};