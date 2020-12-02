$(document).ready(() => {
    $('.masters-cards-container').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        autoplay: true,
        appendArrows: $('.master-controls-arrows'),
        appendDots: $('.master-controls-dots'),
        autoplaySpeed: 2000,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
            {
                breakpoint: 768,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 2,
                    arrows: false,
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 2,
                    arrows: false,
                }
            },

            {
                breakpoint: 453,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 1,
                    arrows: false,
                    centerMode: false
                }
            }
        ],
        customPaging: function (slider, i) {
            var thumb = $(slider.$slides[i]).data();
            return '<a>' + (i + 1) + '</a>';
        },

    });

    $('#gallery-container').slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2300,
        centerMode: true,
        variableWidth: true,
        appendArrows: $('.controls-arrows'),
        appendDots: $('.controls-dots'),
        responsive: [
            {
                breakpoint: 1201,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    centerMode: true,
                    variableWidth: true,
                }
            },

            {
                breakpoint: 1024,
                settings: {
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true
                }
            },

            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    arrows: false
                }
            },

            {
                breakpoint: 424,
                settings: {
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    arrows: false
                }
            },

        ]
    });

    $(function () {
        $("#accordion").accordion({
            heightStyle: 'content',
            header: '> .accordion-item > .accordion-header',
            collapsible: true,
        });
    });

    new WOW({
        animateClass: 'animate__animated'
    }).init();

    $('.magnific').magnificPopup({
        type: 'image'
    });

    $('#phone, #phone-question').mask('+7(000)000-00-00');


    $('.service-card-button, #discount-button').click((e) => {
        $('#reservation-container').css('display', 'flex')
        $('#date').focus((e) => {
            $('#date').mask('00/00/0000', {placeholder: "ДД/ММ/ГГГГ"})
        })

        let select = $('#select-ritual')
        select.val('0')

        switch (e.target.id) {
            case('stone-massage'):
                select.val("Массаж камнями")
                break
            case('bali-massage'):
                select.val("Балийский массаж")
                break
            case('with-pouches-massage'):
                select.val("С травяными мешочками")
                break
            case ('anti-massage'):
                select.val("Антицеллюлитный массаж")
                break
        }
    });

    $('#reservation-cancel, #reservation-container').click((e) => {
        if (e.target.id === 'reservation-cancel-close' || e.target.id === 'reservation-container' || e.target.id === 'reservation-cancel') {
            $('#reservation-container').css('display', 'none')
        }
    });

    $('#reserve-button').click(() => {
        let name = $('#name');
        let phone = $('#phone');
        let select = $('#select-ritual');
        let date = $('#date');
        let error = $('.error-message')
        let flag = true;
        let loader = $('#loader')


        error.hide()
        name.css('border-color', 'rgb(114, 17, 99)')
        phone.css('border-color', 'rgb(114, 17, 99)')
        select.css('border-color', 'rgb(114, 17, 99)')
        date.css('border-color', 'rgb(114, 17, 99)')

        if (name.val() === '') {
            flag = false;
            name.css('border-color', 'red').next(error).show();
        }
        if (phone.val() === '') {
            flag = false;
            phone.css('border-color', 'red').next(error).show();
        }
        if (select.val() === '0') {
            flag = false;
            select.css('border-color', 'red').next(error).show();
        }
        if (date.val() === '') {
            flag = false;
            date.css('border-color', 'red').next(error).show();
        }

        if (flag) {
            loader.css('display', 'flex')
            $.ajax({
                method: 'POST',
                url: 'reserve-mail.php',
                data: 'name=' + name.val() + '&phone=' + phone.val() + '&select=' + select.val() + '&date=' + date.val(),
                success: () => {
                    $('#reservation-content').hide()
                    $('#sent-success').show()
                    loader.hide()
                },
                error: () => {
                    $('#reservation-container').hide()
                    loader.hide()
                    alert("Приносим извенения за технические неполадки! Пожалуйста свяжитесь с нами по телефону, указанному на сайте")
                }
            })
        }
    });

    $('#question-action').click(() => {
        let phone = $('#phone-question');
        phone.css('border-color', 'rgb(114, 17, 99)')
        phone.siblings('.error-message').hide()

        if (phone.val()) {
            $.ajax({
                method: 'POST',
                url: 'question-mail.php',
                data: 'phone=' + phone.val(),
                success: () => {
                    $('#question-form').hide();
                    $('#question-thanks').show();
                },
                error: () => {
                    alert('Извините за технические неполадки. Пожалуйста свяжитесь с нами по телефону, указанному на сайте. Спасибо!')
                }
            })
        } else {
            phone.css('border-color', 'red').siblings('.error-message').show();
        }
    });

    $('#burger').click(() => {
        $('#header').toggleClass('menu-open')
        $('#menu-close-small').show()
    });

    $('#menu-close-small, .menu-item').click((e) => {
        $('#header').removeClass('menu-open')
        $('#menu-close-small').hide()

    })

});
