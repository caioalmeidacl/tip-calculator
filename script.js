const bill = document.querySelector("#bill"); 
const people = document.querySelector("#people");
const tipButtons = document.querySelectorAll(".tip");
const customTip = document.querySelector(".tip-custom");
const errorMsg = document.querySelector(".error-msg");

const isBillValid = Number(bill.value) >= 0;
const isPeopleValid = Number(people.value) > 0;

function handleStatus() {
    
    bill.addEventListener("input", () => {
        bill.classList.toggle("correct", isBillValid);
        bill.classList.toggle("error", !isBillValid);
        calcBill();
    });
    
    people.addEventListener("input", () => {      
        people.classList.toggle("correct", isPeopleValid);
        people.classList.toggle("error", !isPeopleValid); 
        people.classList.contains("error") ? 
            errorMsg.style.display = "block":  
                    errorMsg.style.display = "none";
        calcBill();
    });


    tipButtons.forEach(button => {
        button.addEventListener("click", () => {
    
        tipButtons.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
    
    
            customTip.addEventListener('input', () => {
                tipButtons.forEach(btn => btn.classList.remove('selected'));
            });
        });
    });
}

function checkTipSelection() {
    let tipSelected = false;
    let value = 0
    tipButtons.forEach(button => {
        if (button.classList.contains('selected')) {
            tipSelected = true;
            let percent = button.value;
            value = percent.substr(0,percent.length - 1);
        }
    });

    if (!tipSelected && customTip.value) value = customTip.value;

    return (value / 100);
}

function getData() {
    return [Number(bill.value), Number(checkTipSelection()), (people.value)];
}

function displayResult(amount="0.00", total="0.00"){
    const results = document.querySelectorAll(".price"); 
    results.item(0).textContent = "$"+ amount;
    results.item(1).textContent = "$"+ total;
}

function calcBill(){ 
    const hasValue = (bill.value && people.value) && (isBillValid && isPeopleValid);
    if(!hasValue) {
        displayResult();
        return;
    }
    const [billValue, tip, peopleValue] = getData();
    const tipAmount = (billValue * tip) / peopleValue;  
    const total = (billValue / peopleValue) + tipAmount;

    displayResult(tipAmount.toFixed(2), total.toFixed(2));
}


function handleForm(e) {
    e.preventDefault();
    bill.value = '';
    people.value = '';
    customTip.value = '';
    tipButtons.forEach(btn => btn.classList.remove('selected'));
    displayResult();

    bill.classList.remove('correct', 'error');
    people.classList.remove('correct', 'error');
    errorMsg.style.display = "none";
}

function run(){
    handleStatus();
    document.addEventListener("DOMContentLoaded", calcBill);
    document.addEventListener("submit", handleForm);
}
run();

