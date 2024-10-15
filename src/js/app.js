import * as flsFunction from "./modules/function.js";
import * as featuredScripts from "./modules/featured.js";
flsFunction.isWebp();
featuredScripts.scriptsSectionFeatured();

let lastScrollTop = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scrolling down
        header.classList.add('hidden');
    } else {
        // Scrolling up
        header.classList.remove('hidden');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});