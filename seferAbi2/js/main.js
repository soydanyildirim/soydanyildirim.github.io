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

            var currentEL = step[stepCount];
            var prevEL = step[stepCount].previousElementSibling;
            var nextEL = step[stepCount].nextElementSibling;

            currentEL.classList.replace("passive", "active");

            if (prevEL) {
                prevEL.classList.replace("active", "passive");
                prevEL.classList.add("closed");
            };

            if (nextEL) {
                nextEL.classList.add("passive");
            };

            scrollAnimation();

            // gsap.fromTo(step[stepCount], 1.5, { opacity: 0 }, { display: 'block', opacity: 1, ease: Expo.easeOut, onComplate: scrollAnimation });
        }
    };

    function nextButtonControl() {
        if (stepCount == step.length - 1) {
            next.classList.replace("d-block", "d-none");
            gsap.to(samplesFromTheStore, 1, { display: "block", x: 0, opacity: 1, ease: Expo.easeOut });
            gsap.to(orderAndPayment, 1, { display: "block", x: 0, opacity: 1, ease: Expo.easeOut });
        } else {
            samplesFromTheStore.style = null;
            orderAndPayment.style = null;
            next.classList.replace("d-none", "d-block");
            // gsap.to(samplesFromTheStore, 1, { display: "block", x: 0, opacity: 1, ease: Expo.easeOut });
            // gsap.to(orderAndPayment, 1, { display: "block", x: 0, opacity: 1, ease: Expo.easeOut });
        }
    };

    function scrollAnimation() {
        gsap.to(safe, { duration: 1.5, scrollTo: { x: "max" }, ease: Expo.easeOut });
    }

    next.addEventListener("click", function () {
        nextButtonControl();
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

    var atrium = document.querySelectorAll(".atrium");

    if (atrium) {
        atrium.forEach(function (item, index) {
            item.addEventListener("click", function () {
                if (step[index].matches(".closed")) {
                    for (var i = index; i < step.length; i++) {
                        step[i].classList.remove("passive");
                        step[i].classList.remove("active");
                        step[i].classList.remove("closed");
                    };
                    step[index].classList.add("active");
                    step[index].nextElementSibling.classList.add("passive");
                    stepCount = index;
                };
                nextButtonControl();
            });
        });
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