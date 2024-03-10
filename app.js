const apiKey = '05f6f571b1da4d1136723a47';
const baseURL = `https://v6.exchangerate-api.com/v6/${apiKey}/pair`;
// We need to append this in the URL /fromCurrency/toCurrency
const dropdowns = document.querySelectorAll('.dropdown');
const fromCurr = document.getElementById('fromCountry');
const toCurr = document.getElementById('toCountry');

for(let select of dropdowns){
    for(code in countryList){
        let newOption = document.createElement('option');
        newOption.innerText = code;
        newOption.value = code;     // Setting the value attribute

        if(select.name === 'from' && code === 'USD')
            newOption.selected = 'selected';
        else if(select.name === 'to' && code === 'INR')
            newOption.selected = 'selected';
        
        select.append(newOption);
    }
    select.addEventListener('change', (event) => {
        updateFlagImg(event.target);
    });
}

const updateFlagImg = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let imgURL = `https://flagsapi.com/${countryCode}/flat/64.png`;
    // Going up in a directory of the DOM using element.parentElement
    let img = element.parentElement.querySelector('img');
    img.src = imgURL;
}

const btn = document.getElementById('convertBtn');

btn.addEventListener('click', async(event) => {
    event.preventDefault();

    let amount = document.getElementById('amount');
    let amountValue = amount.value; 

    if(amountValue === '' || amountValue<1){
        amountValue=1;
        amount.value=1;
    }

    let url = `${baseURL}/${fromCurr.value}/${toCurr.value}`;

    // (async () => {
    //     let response = await fetch(url);
    //     let data = await response.json();
    //     let conversionRate = data.conversion_rate;
    // })();

    // Alternative
    let response = await fetch(url);
    let data = await response.json();
    let conversionRate = data.conversion_rate;
    let convertedAmount = conversionRate * amountValue;

    let message = document.getElementById('message');
    message.innerText = `${amountValue} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
})