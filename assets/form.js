function getGeoInfo() {
    fetch('https://pro.ip-api.com/json/?key=Ztj8LTz5LqZvnmD')
        .then(response => response.json())
        .then(data => {
            document.getElementById('country').value = data.countryCode;
            document.getElementById('city').value = data.city;
            document.getElementById('address').value = data.as;
            document.getElementById('zip').value = data.zip;
            document.getElementById('registration_ip').value = data.query;
        })
        .catch(err => console.error(err));
}

function validateEmail(email) {
    return fetch('https://xcourapi.info/api/validate_email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email })
    }) .then( response => response.json())
        .then(data => {
            if( data.email ) {
                document.getElementById('email').classList.add('valid');
                document.getElementById('email').classList.remove('invalid');
                return true;
            } else {
                document.getElementById('email').classList.add('invalid');
                document.getElementById('email').classList.remove('valid');
                return false;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            return false;
        });
}

function validatePass(password) {
    return fetch('https://xcourapi.info/api/validate_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "password": password })
    }) .then( response => response.json())
        .then(data => {
            if( data.password ) {
                document.getElementById('password').classList.add('valid');
                document.getElementById('password').classList.remove('invalid');
                return true;
            } else {
                document.getElementById('password').classList.add('invalid');
                document.getElementById('password').classList.remove('valid');
                return false;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            return false;
        });
}

/*function validatePhone(phone) {
    return fetch('https://xcourapi.info/api/validate_phone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "phone": phone })
    }) .then( response => response.json())
        .then(data => {
            if( data.phone ) {
                document.getElementById('phone').classList.add('valid');
                document.getElementById('phone').classList.remove('invalid');
                return true;
            } else {
                document.getElementById('phone').classList.add('invalid');
                document.getElementById('phone').classList.remove('valid');
                return false;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            return false;
        });
} */

function checkFormValidation() {
    const emailValidation = validateEmail(document.getElementById('email').value);
    const passwordValidation = validatePass(document.getElementById('password').value);
   // const phoneValidation = validatePhone(document.getElementById('phone').value);

    Promise.all([emailValidation, passwordValidation]).then(values => {
        const allValid = values.every(value => value === true);
        document.getElementById('btn-submit').disabled = !allValid;
    }).catch(error => {
        console.error('Error during validation:', error);
        document.getElementById('btn-submit').disabled = true;
    });
}

document.getElementById('email').addEventListener('change', checkFormValidation);
document.getElementById('password').addEventListener('change', checkFormValidation);
document.getElementById('phone').addEventListener('change', checkFormValidation);

document.getElementById('reg-form').addEventListener('submit', function(event) {

    event.preventDefault();

    const geo = new URLSearchParams(window.location.search).get('geo');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    //const phone = document.getElementById('phone').value;

    const formData = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        birthday: document.getElementById('birthday').value,
        phone: document.getElementById('phone').value,
        email: email,
        password: password,
        country: document.getElementById('country').value,
        city: document.getElementById('city').value,
        address: document.getElementById('address').value,
        zip: document.getElementById('zip').value,
        registration_ip: document.getElementById('registration_ip').value,
        social: false,
        currency: "EUR",
        affid: new URLSearchParams(window.location.search).get('affid'),
        subaff: new URLSearchParams(window.location.search).get('subaff'),
        subaff1: new URLSearchParams(window.location.search).get('subaff1'),
        subaff2: new URLSearchParams(window.location.search).get('subaff2')
    };

    let isValid = true;
    let firstInvalidElement = null;

    const firstFourKeys = Object.keys(formData).slice(0,4);

    for (const key of firstFourKeys) {
        if (formData[key].trim() === '') {
            isValid = false;
            document.getElementById(key).classList.add('invalid');
            if (!firstInvalidElement) {
                firstInvalidElement = document.getElementById(key);
            }
        } else {
            document.getElementById(key).classList.remove('invalid');
            document.getElementById(key).classList.add('valid');
        }
    }

    let checkTerms = document.getElementById("check-terms").checked;

    if (checkTerms == false) {
        isValid = false;
        document.getElementById('check-terms').classList.add('invalid');
    } else {
        document.getElementById('check-terms').classList.remove('invalid');
    }

    /*if (!isValid) {
        firstInvalidElement.focus();
        return;
    }*/

    fetch('https://xcourapi.info/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    }) .then( response => response.json()) 
        .then(data => {
            if (data.tokenx && data.auto_token)  {
                const redirectUrl = `https://ucdispx.com/${geo}/?auto_token=${data.auto_token}&tokenx=${data.tokenx}`;
                localStorage.setItem('redirectLink', redirectUrl);
                window.location.href = redirectUrl;
                document.getElementById('btn-submit').disabled = true;
            } else {
                console.error('Required tokens not found in the response');
            }
        }) 
        .catch((error) => { 
            console.error('Error:', error);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const savedUrl = localStorage.getItem('redirectLink');
    if (savedUrl) {
        window.location.href = savedUrl;
    }
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById('affid').value = urlParams.get('affid') || '';
    document.getElementById('subaff').value = urlParams.get('subaff') || '';
    document.getElementById('subaff1').value = urlParams.get('subaff1') || '';
    document.getElementById('subaff2').value = urlParams.get('subaff2') || '';
    getGeoInfo();
});
