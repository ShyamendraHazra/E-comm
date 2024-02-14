const loader = document.getElementById("primary-loader"), mainDiv = document.getElementById("main");
let INRExchangeRate = 0;


function getCurrencyInfo() {
    const XHR_OBJECT = new XMLHttpRequest();

    XHR_OBJECT.open("GET", "https://openexchangerates.org/api/latest.json?app_id=de869111ac4d4135b052a594d36a896c", true);
    XHR_OBJECT.onloadstart = function() {
        loader.style.setProperty("display", "block");
    };

    XHR_OBJECT.onload = function() {
        if(this.status === 200) {
            const APIResponseObjectOne = JSON.parse(this.response);
            INRExchangeRate = parseFloat(APIResponseObjectOne.rates.INR).toPrecision(4);
        }
    };

    XHR_OBJECT.send();
}

function fetchContentData() {
    const XHR_OBJECT = new XMLHttpRequest();
    XHR_OBJECT.open("GET", "https://dummyjson.com/products?limit=100&delay=300", true);

    XHR_OBJECT.onloadend = function() {
        loader.style.setProperty("display", "none");
    };
    
    XHR_OBJECT.onload = function() {
        if(this.status === 200) {
    
            const APIResponseObject = JSON.parse(this.response);
            for(let index = 0; index < APIResponseObject.limit; index++) {    
    
                const itemEelement = document.createElement("div"),
                imageContainer = document.createElement("div"),
                imageTag = document.createElement("img"),
                headerTextElement = document.createElement("h4"),
                itemPriceLabel = document.createElement("h4"),
                itemPriceValue = document.createTextNode(Math.round(parseInt(APIResponseObject.products[index].price)*INRExchangeRate).toLocaleString("en-IN")),
                headingText = document.createTextNode(APIResponseObject.products[index].title)
    
                // imageTag.setAttribute("src", "");
                imageTag.setAttribute("src", APIResponseObject.products[index].thumbnail);
                imageTag.setAttribute("alt", "product image");
                imageContainer.className = "img-container";
                imageContainer.appendChild(imageTag);
                itemEelement.className = "item";
                itemEelement.appendChild(imageContainer);
                headerTextElement.appendChild(headingText);
                itemEelement.appendChild(headerTextElement);
                itemPriceLabel.appendChild(itemPriceValue);
                itemEelement.appendChild(itemPriceLabel);
                mainDiv.insertAdjacentElement("beforeend", itemEelement);
            }
        }
    };
    
    XHR_OBJECT.send();
}

function handleTimeout() {
    count++;
    console.log(`check count : ${count}`);
    if (INRExchangeRate !== 0) {
        clearInterval(intervalId);
        fetchContentData();
    }
}
let count = 0;
getCurrencyInfo();
let intervalId = setInterval(handleTimeout,100);


