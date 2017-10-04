let createCustomScrollerFor = function (scrollWrapper, scroll, prefix) {    
    let scrollContainer = document.querySelector(scroll);
    let scrollContentWrapper = document.querySelector(scrollWrapper);
    let contentPosition = 0;
    let scrollerBeingDragged = false;
    let scroller;
    let topPosition;

    function resize() {
        window.addEventListener("resize", resizeHandler);
        scrollContainer.addEventListener("click", resizeHandler);
    }

    function resizeHandler(event) {
        setTimeout(function() {
            calculateScrollerHeight()
        }, 0);
    }
    
    function calculateScrollerHeight() {
        let visibleRatio = scrollContentWrapper.clientHeight / scrollContainer.scrollHeight;

        if(visibleRatio < 1) {
            let scrollerHeight = visibleRatio * scrollContentWrapper.clientHeight;
            scroller.style.height = scrollerHeight + 'px';

            return scrollerHeight;
        } else {
            scroller.style.height = 0 + 'px';
            return 0;
        }
    }

    function moveScroller(evt) {
        let scrollPercentage = evt.target.scrollTop / scrollContentWrapper.scrollHeight;
        topPosition = scrollPercentage * (scrollContainer.offsetHeight - 5); 
        
        scroller.style.top = topPosition + 'px';
    }

    function startDrag(evt) {
        normalizedPosition = evt.pageY;
        contentPosition = scrollContentWrapper.scrollTop;
        scrollerBeingDragged = true;
    }

    function stopDrag(evt) {
        scrollerBeingDragged = false;
    }

    function scrollBarScroll(evt) {
        if (scrollerBeingDragged === true) {
            let mouseDifferential = evt.pageY - normalizedPosition;
            let scrollEquivalent = mouseDifferential * (scrollContentWrapper.scrollHeight / scrollContainer.offsetHeight);
            scrollContentWrapper.scrollTop = contentPosition + scrollEquivalent;
        }
    }

    function createScroller() {
        scroller = document.createElement("div");
        scroller.className = 'scroller';

        let scrollerHeight = calculateScrollerHeight();
        
        if (scrollerHeight < scrollContentWrapper.offsetHeight){
            scroller.style.height = scrollerHeight + 'px';

            scrollContainer.appendChild(scroller);
            
            scrollContentWrapper.className += ' showScroll';
            
            scroller.addEventListener('mousedown', startDrag);
            window.addEventListener('mouseup', stopDrag);
            window.addEventListener('mousemove', scrollBarScroll)
        }
        
    }

    createScroller();
    resize();
    scrollContentWrapper.addEventListener('scroll', moveScroller);
};


createCustomScrollerFor('#messages', '#messages');
createCustomScrollerFor('#about', '#about');