window.onload = function () {

    var button = document.querySelector('.btn');
    button.onclick = function () {
        if ( $('.wheel-btn').hasClass('first-spin') ) {
            spin_1();
        }
        if ( $('.wheel-btn').hasClass('second-spin') ) {
            spin_2();
        }
    };

    function spin_1 () {
        $('.wheel-btn').html('Inscription');
        document.querySelector('.wheel-img').classList.add('wheel-img-animated-1');
        setTimeout(function () {
            localStorage.currentSpin = '9560_spin_1';
            document.querySelector('.wheel-img').classList.remove('wheel-img-animated-1');
            document.querySelector('.wheel-img').classList.remove('wheel-img-animated');
            $('.wheel-block-content').addClass('win');
            $('.btn').addClass('second-spin').removeClass('first-spin');
        }, 4000);
    }

    function spin_2 () {
        setTimeout(function () {
            localStorage.currentSpin = '9560_spin_2';
            $('.wheel-modal').css('display','flex');
            $('.btn').removeClass('second-spin');
        }, 1000);
    }

    /*switch(localStorage.currentSpin) {
        case '9560_spin_1':
            $('.wheel-block-content').addClass('win');
            $('.btn').addClass('second-spin').removeClass('first-spin');
            break;

        case '9560_spin_2':
            $('.wheel-modal').css('display','flex');
            $('.btn').removeClass('second-spin');
            break;
    }*/
};

$(document).ready(function () {
    //$("#phone").inputmask({"mask": "+33 (999) 999-99-99"});

    $("#birthday").inputmask({"mask": "99/99/9999"});
});