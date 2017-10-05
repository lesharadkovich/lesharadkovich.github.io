let createCustomScrollerFor = function (scrollWrapper) {    
    let scrollContainer = document.querySelector(scrollWrapper);
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

    function moveScroller(event) {
        let scrollPercentage = event.target.scrollTop / scrollContentWrapper.scrollHeight;
        topPosition = scrollPercentage * (scrollContainer.offsetHeight - 5); 

        if(scrollWrapper == '#messages') {
            topPosition += 8;
        }
        
        scroller.style.top = topPosition + 'px';
    }

    function startDrag(event) {
        scrollContentWrapper.className += ' noselect';

        normalizedPosition = event.pageY;
        contentPosition = scrollContentWrapper.scrollTop;
        scrollerBeingDragged = true;
    }

    function stopDrag(event) {
        scrollContentWrapper.classList.remove('noselect');
        scrollerBeingDragged = false;
    }

    function scrollBarScroll(event) {
        if (scrollerBeingDragged === true) {
            let mouseDifferential = event.pageY - normalizedPosition;
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
            if(scrollWrapper == '#messages') {
                scroller.style.top = '8px';
            }


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


createCustomScrollerFor('#messages');
createCustomScrollerFor('#about');