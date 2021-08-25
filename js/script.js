const spollersArray = document.querySelectorAll("[data-spollers]");
console.log(spollersArray,'spollers array');



if(spollersArray.length > 0){

    //  For simple spollers

    const spollersRegular = Array.from(spollersArray).filter(function filtred(item, index, self){
            return !item.dataset.spollers.split(",")[0];
        }
    )
    if (spollersRegular.length > 0){
        initSpollers(spollersRegular)
    };


    //  For media spollers

    const spollersMedia = Array.from(spollersArray).filter(function(item, index, self){
        return item.dataset.spollers.split(",")[0];
    });
    console.log(spollersMedia,'vvaava');
    
    if(spollersMedia.length > 0){
        const breakpointsArray = [];
        spollersMedia.forEach(item =>{
            const params = item.dataset.spollers;
            console.log(params,'vaaa');
            const breakpoint = {};
            const paramsArray = params.split(",");
            console.log(paramsArray,'pa');
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
            console.log(breakpoint.type,'type');
            breakpoint.item = item;
            breakpointsArray.push(breakpoint)
        })
    
        // Unit breakpoint
    
        let mediaQueries = breakpointsArray.map(function(item){
            return '(' + item.type + "-width:" + item.value + "px)," + item.value + ',' + item.type;
        })
        console.log(mediaQueries,'result');
    
        mediaQueries = mediaQueries.filter(function(item, index, self){
            return self.indexOf(item) === index
        })
        
    
        // Works breakpoints
    
        mediaQueries.forEach(breakpoint =>{
            const paramsArray = breakpoint.split(",");
            console.log(paramsArray,'pa');  
            const mediaBreakpoint = paramsArray[1];
            console.log(mediaBreakpoint,'br');
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);
            console.log(matchMedia,'mm');


            const spollersArray = breakpointsArray.filter(function(item){
                if(item.value === mediaBreakpoint && item.type === mediaType){
                    return true;
                }
            })
                console.log(spollersArray,'sa');
            // cobitie
    
            matchMedia.addListener(function(){
                initSpollers(spollersArray, matchMedia);
            })
            initSpollers(spollersArray, matchMedia);
        });
    }

    // Initing

    function initSpollers(spollersArray, matchMedia = false){
        var isl= spollersArray
        var matchM= matchMedia
        console.log(isl, 'isl');
        console.log(matchM, 'islllll');

        spollersArray.forEach(spollersBlock =>{
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
            if(matchMedia.matches || !matchMedia){
                spollersBlock.classList.add("init");
                initSpollerBody(spollersBlock);
                spollersBlock.addEventListener("click", setSpollerAction);
            }
            else{
                spollersBlock.classList.remove("init");
                initSpollerBody(spollersBlock, false);
                spollersBlock.removeEventListener("click", setSpollerAction);
            }
        })
    }

    // Work width contents

    function initSpollerBody(spollersBlock, hideSpollerBody = true){
        const spollersTitles = document.querySelectorAll("[data-spoller]");
        if(spollersTitles.length > 0){
            spollersTitles.forEach(spollersTitle =>{
                if(hideSpollerBody){
                    spollersTitle.removeAttribute('tabindex');
                    if(!spollersTitle.classList.contains("active")){
                        spollersTitle.nextElementSibling.hidden = true;
                    }
                }
                else{
                    spollersTitle.setAttribute('tabindex', '-1');
                    spollersTitle.nextElementSibling.hidden = false;

                }
            })
        }
    }
    // Spoller action

    function setSpollerAction (e){
        const el = e.target;
        if(el.hasAttribute('[data-spoller]') || el.closest('[data-spoller]')){
            const spollerTitle = el.hasAttribute('[data-spoller]') ? el : el.closest('[data-spoller]');
            console.log(spollerTitle,'title');
            const spollersBlock = spollerTitle.closest('[data-spoller]');
            console.log(spollersBlock, 'block');
            const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
            
            if(!spollersBlock.querySelectorAll('.slide').length){
                if(oneSpoller && !spollerTitle.classList.contains('active')){
                    hideSpollersBody(spollersBlock);
                }
                spollerTitle.classList.toggle('active');
                slideToggle(spollerTitle.nextElementSibling, 500)
            }
            e.preventDefault();
        }
    }

    function hideSpollersBody(spollersBlock){
        const spollersActiveTitle = spollersBlock.querySelector('[data-spoller].active');
        if(spollersActiveTitle){
            spollersActiveTitle.classList.remove('active');
            slideUp(spollerTitle.nextElementSibling, 1)
        }
    }
}

// Slide toggle
let slideUp = (target, duration) =>{
    if(!target.classList.contains('slide')){
        console.log(target);
        target.classList.add('slide');
        target.style.transitionProperty = 'height','margin','padding';
        target.style.transitionDuration = duration +'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.owerflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginBottom = 0;
        target.style.marginTop = 0;
        window.setTimeout(() =>{
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('pading-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('slide');
        }, duration);
    }
}

let slideDown = (target, duration) =>{
    if(!target.classList.contains('slide')){
        target.classList.add('slide');
        if(target.hidden){
            console.log(target,'target');
            target.hidden = false
        };

        let height =target.offsetHeight;
        target.style.owerflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginBottom = 0;
        target.style.marginTop = 0;
        target.offsetHeight;
        target.style.transitionProperty = 'height','margin','padding';
        target.style.transitionDuration = duration +'ms';
        target.style.height = target.offsetHeight + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('pading-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() =>{
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('slide');
        }, duration)
    }
}

let slideToggle = (target, duration = 500) => {
    if(target.hidden){
        return slideDown(target, duration);
    }
    else{
        return slideUp(target, duration);
    }
}
