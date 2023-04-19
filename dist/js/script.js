$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 300,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/carousel/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/carousel/right.svg"></button>',
        responsive: [
            {  
                breakpoint: 768,
                settings: {
                    dots: true,
                    arrows: false,
                }
            },

            
        ]
      });
    
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    $('.button_add').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

 /*    $('#consultation-form').validate();
   // $('#consultation form').validate({
        rules: {
            // simple rule, converted to {required:true}
            name: {
                required: true,
                minlength: 2
            },
            phone: "required",
            // compound rule
            email: {
              required: true,
              email: true
            }
          },
          messages: {
            name: {
                required: "Пожалуйста, введите свое имя",
                minlength: jQuery.validator.format("Имя доолжно быть дниннее {0} букв")
            },
            phone: "Пожалуйста, введите номер телефона",
            email: {
              required: "Пожалуйста, введите свою электронную почту",
              email: "Адрес электронной почты введен неверно"
            }
          }  
    }); */
    

    function valideForm(form) {
        $(form).validate({
            rules: {
                // simple rule, converted to {required:true}
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                // compound rule
                email: {
                  required: true,
                  email: true
                }
              },
              messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Имя доолжно быть дниннее {0} букв")
                },
                phone: "Пожалуйста, введите номер телефона",
                email: {
                  required: "Пожалуйста, введите свою электронную почту",
                  email: "Адрес электронной почты введен неверно"
                }
            }  
        });

    };

    valideForm('#order form');
    valideForm('#consultation form');
    valideForm('#consultation-form');

    $("input[name=phone]").mask("+7 (999) 999-9999");

    $('form').submit(function(e) {
        //отменяем стандартное поведение браузера
        e.preventDefault();

        if (!$(this).valid()) {
           return; 
        }

        $.ajax({
            //отдавать данные на сервер
            type: "POST",
            //куда будет отправляться запрос
            URL: "mailer/smart.php",
            // данные которые будут отправл на сервер
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();


            $('form').trigger('reset');
        });
        return false;


    });
  });
 