// Main JS should go here!
// Include scripts using Browserify by doing:
import $ from "jquery";

var header = document.querySelector(".willow-page-header");
var open = document.querySelector(".willow-page-header__content-open");
var close = document.querySelector(".willow-page-header__content-close");

open.addEventListener("click", function (e) {
    header.setAttribute("data-content-open", "true");
});

close.addEventListener("click", function (e) {
    header.setAttribute("data-content-open", "false");
});


//Sticky Nav so far:
const secondaryNav = document.querySelector(".willow-secondary-nav");
const pageHeader = document.querySelector(".willow-page-header");
const willowBanner = document.querySelector(".willow-banner");

var computedHeight = pageHeader.offsetHeight + willowBanner.offsetHeight;
var computedWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);

function fixed() {
    if (computedWidth >= 1230) {
        if (document.body.scrollTop >= computedHeight) {
            secondaryNav.classList.add("fixed"); 
        } else {
            secondaryNav.classList.remove("fixed");
        }
    } else {
        secondaryNav.classList.remove("fixed");
    }
}

window.onresize = function() {
    computedWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
    computedHeight = pageHeader.offsetHeight + willowBanner.offsetHeight;
    fixed();
}

$(function(){
    let scrolled = true;

    const categoryHeadings = $(".category__heading");
    const categoryLinks = $(".willow-secondary-nav__item a");
    let activeLinkIndex = -1;

    function getHeadingPositions() {
        return $.map(categoryHeadings, function(heading) {
            return $(heading).offset().top;
        });
    }

    function animationFrame() {
        if(scrolled) {
            updateActiveLink();
            fixed();
            scrolled = false;
        }
        requestAnimationFrame(animationFrame);
    }
    requestAnimationFrame(animationFrame); 

    function updateActiveLink() {
        let categoryHeadingPositions = getHeadingPositions();
        const scrollTop = $("body").scrollTop();
    
        const currentSection = categoryHeadingPositions.reduce(function(prev, curr, index) {
            if(scrollTop >= curr) {
                return index;
            }
            return prev;
        }, -1);
        if(currentSection !== activeLinkIndex) {
            categoryLinks.removeClass("active");
            categoryLinks.eq(currentSection).addClass("active");
        }
    }

    $(window).on("scroll", function(){
        scrolled = true;
    });

    categoryLinks.on("click", function(e) {
        e.preventDefault();
        const targetHash = e.target.href.match(/.*#(.*)/)[1]; 
        const targetSection = $(`#${targetHash}`);
        
        $("body").animate({
            scrollTop:  targetSection.offset().top
        }, function() {
            window.location.hash = targetHash;
        });
    });
});