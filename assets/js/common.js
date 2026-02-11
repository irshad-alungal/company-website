addActiveClassToMenu();

function addActiveClassToMenu() {
    const url = window.location.pathname;
    const menuListItems = $(".mainMenu");
    menuListItems.removeClass('activeMenu');
    menuListItems.each(function() {
        let menuURL = $(this).find('a').attr('href');
        if (url === menuURL) {
            $(this).addClass('activeMenu');
        } else {
            if (url.startsWith(menuURL) && menuURL !== "/") {
                $(this).addClass('activeMenu');
            }
        }
    });
}

/* function for sliding cards*/
function sideScrollCards(elementWrapper, cardCalss, direction, increment, animationFunction) {
    increment = increment || 1;
    var slideIndex = elementWrapper + 'Index';
    window[slideIndex] = (typeof window[slideIndex] != 'undefined') ? window[slideIndex] : 0;
    var cardCalssList = document.getElementsByClassName(cardCalss);
    var firstCard = cardCalssList[0];
    var wrapperDiv = document.getElementById(elementWrapper);
    wrapperDiv.style.transition = 'transform 0.6s ease';
    var cardNos = cardCalssList.length;
    var cardWidth = firstCard.offsetWidth;
    var distanceToTransalte = 0;
    var wrapperWidth = wrapperDiv.offsetWidth;
    var cardStyle = firstCard.currentStyle || window.getComputedStyle(firstCard);
    var wrapperStyle = wrapperDiv.currentStyle || window.getComputedStyle(wrapperDiv);
    var cardOuterWidth = cardWidth + parseFloat(cardStyle.marginRight) + parseFloat(cardStyle.marginLeft);
    var wrapperInnerWidth = wrapperWidth - (parseFloat(wrapperStyle.paddingRight) + parseFloat(wrapperStyle.paddingLeft));
    var totalWidthOfCards = cardOuterWidth * cardNos;
    if (direction === 'prev') {
        window[slideIndex] = (window[slideIndex] > 0) ? window[slideIndex] - increment : 0;
    } else if (direction === 'next') {
        window[slideIndex] = (window[slideIndex] <= cardNos) ? window[slideIndex] + increment : 0;
    }
    console.log('fnindex : ' + window[slideIndex]);
    //window[slideIndex] = (window[slideIndex] > (cardNos - 1)) ? 0 : window[slideIndex];
    distanceToTransalte = window[slideIndex] * cardOuterWidth;
    if (distanceToTransalte > ((totalWidthOfCards - wrapperInnerWidth) + (cardOuterWidth * increment))) {
        window[slideIndex] = 0;
        distanceToTransalte = 0;
    } else if (distanceToTransalte > (totalWidthOfCards - wrapperInnerWidth)) {
        distanceToTransalte = totalWidthOfCards - wrapperInnerWidth;
        window[slideIndex] = cardNos;
    }
    distanceToTransalte = (distanceToTransalte === 0) ? 0 : '-' + distanceToTransalte;
    wrapperDiv.style.transform = 'translateX(' + distanceToTransalte + 'px)';
    if (animationFunction) {
        animationFunction();
    }
}



/*Dropdown Function*/
$(document).ready(function() {
    $(document).on('click', ".dropBox", function(e) {
        e.preventDefault();
        let dropBox = $(this);
        let dropSection = dropBox.closest('.dropSection');
        dropSection.find('.dropContent').slideUp();
        /* $(".dropBox").removeClass("activeDropBox");*/
        let dropContent = dropBox.closest(".dropList").find(".dropContent");
        dropContent.slideUp();
        if (dropBox.find(".dropAdd").is(":hidden")) {
            dropBox.find(".dropRemove").hide();
            dropBox.find(".dropAdd").show();
        } else {
            dropBox.find(".dropRemove").show();
            dropBox.find(".dropAdd").hide();
            let dropContent = dropBox.closest(".dropList").find(".dropContent");
            dropContent = dropContent.not(dropContent.find(".dropContent"));
            /* select child dropContent */
            dropContent.slideDown();
            /*let childDropContent = dropContent.find(".dropContent");
            childDropContent.slideUp(0);*/
        }
    });
});

function tabBar(parentContainer, index, event) {
    event.preventDefault();
    $(parentContainer + ' .tabMenu').removeClass("activeTabMenu");
    const elem = $(event.target);
    elem.addClass("activeTabMenu");
    let scrollValue = parseInt(index) * 100;
    if (scrollValue > 0) {
        scrollValue = '-' + scrollValue;
    }
    const tabBarWrapper = $(parentContainer + " .tabBarWrapper");
    tabBarWrapper.css("transition", 'all .5s');
    tabBarWrapper.css("left", +scrollValue + '%');
    const tabContainers = $(parentContainer + ' .tabBarSlide');
    tabContainers.css("height", '0');
    tabContainers.css("opacity", '0');
    const activeTabContainer = $(parentContainer + ' .tabBarSlide:nth-child(' + (parseInt(index) + 1) + ')');
    activeTabContainer.css("height", 'auto');
    activeTabContainer.css("opacity", '1');
}

/*onScroll Hide Function*/
function menuShowHideOnScroll() {
    var currentScrollPos = window.pageYOffset;
    if (currentScrollPos <= 200) {
        $(".scrollTop").removeClass("scrollTopIntro");
        $(".scrollBottom").removeClass("scrollBottomIntro");
    } else if (prevScrollpos >= currentScrollPos) {
        $(".scrollTop").removeClass("scrollTopIntro");
        $(".scrollBottom").removeClass("scrollBottomIntro");
    } else {
        $(".scrollTop").addClass("scrollTopIntro");
        $(".scrollBottom").addClass("scrollBottomIntro");
    }
    prevScrollpos = currentScrollPos;
}


/* function for hiding showing navbar*/
var prevScrollpos = window.pageYOffset;
$(window).on("scroll", function() {
    menuShowHideOnScroll();
    headerScrollIntro();
});


function headerScrollIntro() {
    let header = $(".headerSection");
    let currentScrollPos = window.pageYOffset;
    if (currentScrollPos <= 100) {
        header.removeClass("headerIntro");
    } else {
        header.addClass("headerIntro");
    }
    prevScrollpos = currentScrollPos;
}

$(".popupClose").click(function() {
    let section = $(this).closest("section");
    section.removeClass("popupIntro");
});

function getLatLonFromGoogleMapsLink(link) {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = link.match(regex);

    if (match && match.length >= 3) {
        const latitude = parseFloat(match[1]);
        const longitude = parseFloat(match[2]);
        return { latitude, longitude };
    } else {
        return null;
    }
}

function setSelector(row) {
    let selectorElements = row.find('selector');
    selectorElements.each(function() {
        $(this).selector();
    });
}

$(document).ready(function() {
    $('.navIcon').click(function() {
        $('.navSection').toggleClass('navSectionIntro');
        $('.navIcon').toggleClass('navIconIntro');
        // $(".menuCloseBg").show();
    });

    $(".mainMenu").on("click", function(e) {
        let subMenu = $(this).closest(".navMenu").find(".subMenuContainer");
        if (subMenu.length > 0) {
            $(".subMenuContainer").not(subMenu).slideUp(500);
            subMenu.slideToggle(500);
            e.preventDefault();
        }
    });
});