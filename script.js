const bill = document.querySelector("#bill"); 
const people = document.querySelector("#people");
const tipButtons = document.querySelectorAll(".tip");
const customTip = document.querySelector(".tip-custom");
const errorMsg = document.querySelector(".error-msg");
const submitBtn = document.querySelector(".submit");
function handleStatus() {
    
    bill.addEventListener("input", () => {
        isBillValid = Number(bill.value) >= 0;
        bill.classList.toggle("correct", isBillValid);
        bill.classList.toggle("error", !isBillValid);
        calcBill();
    });
    
    people.addEventListener("input", () => {     
        isPeopleValid = Number(people.value) > 0
        people.classList.toggle("correct", isPeopleValid);
        people.classList.toggle("error", !isPeopleValid); 
        people.classList.contains("error") ? 
            errorMsg.style.display = "block":  
                    errorMsg.style.display = "none";


        submitBtn.classList.add("active");
        calcBill();
    });


    tipButtons.forEach(button => {
        button.addEventListener("click", () => {
        tipButtons.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
        });
    });

    customTip.addEventListener("input", () => {
        tipButtons.forEach(btn => btn.classList.remove('selected'));
        const tip = customTip.value >= 0;
        customTip.classList.toggle("correct", tip);
        customTip.classList.toggle("error", !tip);
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
    return [Number(bill.value), Number(checkTipSelection()), Number(people.value)];
}

function displayResult(amount="0.00", total="0.00"){
    const results = document.querySelectorAll(".price"); 
    results.item(0).textContent = "$"+ amount;
    results.item(1).textContent = "$"+ total;
}

function calcBill(){ 
    const hasValue = (bill.value && people.value);
    if(!hasValue) {
        displayResult();
        return;
    }
    c
    const [billValue, tip, peopleValue] = getData();
    const tipAmount = (billValue * tip) / peopleValue;  
    const total = (billValue / peopleValue) + tipAmount;

    displayResult(tipAmount.toFixed(2), total.toFixed(2));
}


function handleForm(e) {
    e.preventDefault();
    submitBtn.classList.remove("active");
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

