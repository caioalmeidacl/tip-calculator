const inputs = document.querySelectorAll('.input');
const tipElements = document.querySelectorAll(".tip-custom, .tip");
const errorMsg = document.querySelector(".error-msg");
const submitBtn = document.querySelector(".submit");


function handleStatus() {
    inputs.forEach(input => { 
        let validation = Number(input.value) >= 0;
        input.addEventListener("input", () => { 
            if(input.id !== "bill") validation =  Number(input.value) > 0;            
            input.classList.toggle("correct", validation);
            input.classList.toggle("error", !validation);

            if(input.id === "people")
                input.classList.contains("error") ?  
                    errorMsg.style.display = "block" :
                    errorMsg.style.display = "none";
            calcBill();
        });
        submitBtn.classList.add("active");
    });


    tipElements.forEach(element => {
        element.addEventListener("input", () => {
            tipElements.forEach(element => {
                element.classList.remove('selected')
            });
            let isValid = element.value >= 0;
            element.classList.toggle("correct", isValid);
            element.classList.toggle("error", !isValid);
            calcBill(); 
        });    
                 
        if(element.classList.contains("tip")) {
            element.addEventListener("click", () => {
                tipElements.forEach(element => {
                    element.classList.remove("selected");
                    if(element.classList.contains("tip-custom")) element.value = "";
                });
                element.classList.add("selected");
                calcBill(); 
            });            
        }
    });
}


function checkTipSelection() {
    let isTipSelected = false;
    let value = 0;
    tipElements.forEach(element => {
        if (element.classList.contains('selected')) {
            isTipSelected = true;
            let percent = element.value;
            value = percent.substr(0,percent.length - 1);
            return;
        }
        if(element.classList.contains("tip-custom") && !isTipSelected) value = element.value;
    });

    return (value / 100);    
}

function getData() {
    return [Number(inputs[0].value), Number(checkTipSelection()), Number(inputs[1].value)];
}

function displayResult(amount="0.00", total="0.00"){
    const results = document.querySelectorAll(".price"); 
    results.item(0).textContent = "$"+ amount;
    results.item(1).textContent = "$"+ total;
}

function calcBill(){ 
    const hasValue = Array.from(inputs).filter(input => input.value === "");
    if(hasValue.length !== 0) {
        displayResult();
        return;
    }
    const [billValue, tip, peopleValue] = getData();
    console.log(billValue, tip, peopleValue);
    const tipAmount = (billValue * tip) / peopleValue;  
    const total = (billValue / peopleValue) + tipAmount;

    displayResult(tipAmount.toFixed(2), total.toFixed(2));
}


function handleForm(e) {
    e.preventDefault();
    submitBtn.classList.remove("active");

    inputs.forEach(input => input.value = "");

    tipElements.forEach(element => {
        element.classList.remove('selected')
        if(element.classList.contains("tip-custom"))
            element.value = "";
    });
    displayResult();
    errorMsg.style.display = "none";
}

function run(){
    handleStatus();
    document.addEventListener("DOMContentLoaded", calcBill);
    document.addEventListener("submit", handleForm);
}
run();

