(function () {

    var step = document.querySelectorAll(".step");
    var next = document.querySelector(".nextStep");
    var samplesFromTheStore = document.querySelector(".samplesFromTheStore");
    var orderAndPayment = document.querySelector(".orderAndPayment");
    var safe = document.querySelector(".safe");

    var stepCount = 0;

    function nextStep() {
        if (stepCount < step.length - 1) {
            stepCount++;
            step[stepCount].classList.add("active");
            step[stepCount].previousElementSibling.classList.replace("active", "d-block");
            gsap.fromTo(step[stepCount], 1.5, { opacity: 0 }, { display: 'block', opacity: 1, ease: Expo.easeOut, onComplate: scrollAnimation });
        };
        if(stepCount == step.length -1) {
            next.classList.replace("d-block", "d-none");
            gsap.to(samplesFromTheStore, 1, {display: "block", x: 0, opacity: 1, ease: Expo.easeOut});
            gsap.to(orderAndPayment, 1, {display: "block", x: 0, opacity: 1, ease: Expo.easeOut});
        };
    };

    function scrollAnimation() {
        gsap.to(safe, { duration: 1.5, scrollTo: { x: "max" }, ease: Expo.easeOut });
    }

    next.addEventListener("click", function () {
        nextStep();
    });

    var moreThenOne = document.querySelectorAll(".moreThenOne");

    if (moreThenOne) {
        moreThenOne.forEach(function (item) {
            item.addEventListener("click", function () {
                var specialArea = item.getAttribute("area");
                moreThenOne.forEach(function (specialItem) {
                    if (specialItem.getAttribute("area") == specialArea) {
                        specialItem.classList.remove("active");
                    }
                })
                item.classList.add("active")
            })
        })
    };

    $('.sliderSafe').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        nextArrow: '<button type="button" class="slick-next"><img src="images/icons/arrow-right.svg" /></button>',
        prevArrow: '<button type="button" class="slick-prev"><img src="images/icons/arrow-left.svg" /></button>'
    });

    var newCatetoryImages = document.querySelectorAll(".newCatetoryImages");

    if (newCatetoryImages) {
        newCatetoryImages.forEach(function (item) {
            item.addEventListener("click", function () {
                $('.sliderSafe').slick("refresh");
            });
        })
    };




})();