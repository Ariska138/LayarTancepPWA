const loadHtml = () => {
    let pages = $('.load-html');
    if(pages.length >= 0){
        $.each(pages, function(idx, item){
            let $item = $(item);
            let content = $item.data('loadHtml');
            if(typeof content !== typeof null && typeof content !== typeof null) {
                $item.load(content);
            }
        });
    }
};

const init = () => {
    $('.sidenav').sidenav();
    $('.parallax').parallax();
}

$(function(){
    loadHtml();
    init();
});