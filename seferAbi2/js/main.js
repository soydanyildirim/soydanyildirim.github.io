(function () {

    var step = document.querySelectorAll(".step");
    var next = document.querySelectorAll(".nextStep");
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

            if (!bulb.matches(".active")) {
                bulb.classList.toggle("active");
            }

            scrollAnimation();

            // gsap.fromTo(step[stepCount], 1.5, { opacity: 0 }, { display: 'block', opacity: 1, ease: Expo.easeOut, onComplate: scrollAnimation });
        }
    };

    function nextButtonControl(item) {
        if (stepCount == step.length - 1) {
            item.classList.replace("d-block", "d-none");
            gsap.to(samplesFromTheStore, 1, { display: "block", x: 0, opacity: 1, ease: Expo.easeOut });
            gsap.to(orderAndPayment, 1, { display: "block", x: 0, opacity: 1, ease: Expo.easeOut });
        } else {
            samplesFromTheStore.style = null;
            orderAndPayment.style = null;
            // gsap.to(samplesFromTheStore, 1, { display: "block", x: 0, opacity: 1, ease: Expo.easeOut });
            // gsap.to(orderAndPayment, 1, { display: "block", x: 0, opacity: 1, ease: Expo.easeOut });
        }
    };

    function scrollAnimation() {
        gsap.to(safe, { duration: 1.5, scrollTo: { x: "max" }, ease: Expo.easeOut });
    }

    if (next) {
        next.forEach(function (item) {
            item.addEventListener("click", function () {
                nextButtonControl(item);
                nextStep();
            });
        });
    };

    var moreThenOne = document.querySelectorAll(".moreThenOne");

    if (moreThenOne) {
        moreThenOne.forEach(function (item) {
            item.addEventListener("click", function () {
                nextStep();
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

    var bulb = document.querySelector(".bulb");

    if (bulb) {
        bulb.addEventListener("click", function () {
            bulb.classList.toggle("active");
        });
    };

    var packageSafe = document.querySelectorAll(".packageSafe");

    if (packageSafe) {
        packageSafe.forEach(function (item) {
            item.addEventListener("click", function () {
                var getImgUrl = item.querySelector("img").getAttribute("src");
                createImg(item, getImgUrl)
            })
        })
    };

    function createImg(item, src) {
        var img = new Image();
        img.src = src;
        img.classList.add("img-fluid");
        var control = item.closest(".step").querySelector(".packagePreview");
        if (control) {
            if (control.querySelector("img")) {
                var getParentChild = control.querySelector("img");
                getParentChild.setAttribute("src", src);
                if (!getParentChild.matches("img-fluid")) {
                    getParentChild.classList.add("img-fluid");
                }
            } else {
                control.appendChild(img);
            };
        }
    };

    var youWorkControl = document.querySelector(".youWorkControl");

    $('.workingDetailRadio').iCheck({
        radioClass: 'icheckbox_minimal',
    }).on('ifChecked', function (event) {
        if(event.target.id == "workingDetailWork1") {
            youWorkControl.classList.add("active");
        } else {
            youWorkControl.classList.remove("active");
        }
    });

    $(".youWorkControlCheck").iCheck({
        checkboxClass: 'icheckbox_minimal',
    });

    var workingDetailSelect = document.querySelectorAll(".workingDetailSelect");

    if(workingDetailSelect) {
        workingDetailSelect.forEach(function(item) {
            item.addEventListener("change", function() {
                if(item.closest(".workingDetailSelectSafe")) {
                    if(item.value != "") {
                        item.closest(".workingDetailSelectSafe").querySelector("span").innerHTML = item.value + " TL";
                    } else {
                        item.closest(".workingDetailSelectSafe").querySelector("span").innerHTML = "";
                    };
                };
            });
        });
    };

    $('.boxRadio').iCheck({
        radioClass: 'icheckbox_minimal'
    });

    $(".extraProduct").iCheck({
        checkboxClass: 'icheckbox_minimal'
    }).on('ifChecked', function () {
        nextStep();
        setTimeout(function(){
            $('.extraProduct').iCheck('uncheck');
        }, 10);
    });

    var categoryFabric = document.querySelectorAll(".categoryFabric");

    if(categoryFabric) {
        categoryFabric.forEach(function(item) {
            item.addEventListener("click", function() {
                if(item.getAttribute("src")) {
                    var getImgUrl = item.getAttribute("src");
                    createImgAttr(item, getImgUrl)
                };
            });
        });
    };

    function createImgAttr(item, src) {
        var img = new Image();
        img.src = src;
        img.classList.add("img-fluid");
        var control = item.closest(".step").querySelector(".packagePreview");
        if (control) {
            if (control.querySelector("img")) {
                var getParentChild = control.querySelector("img");
                getParentChild.setAttribute("src", src);
                if (!getParentChild.matches("img-fluid")) {
                    getParentChild.classList.add("img-fluid");
                }
            } else {
                control.appendChild(img);
            };
        };
    };

})();