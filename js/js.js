// Function used to prevent no numerical character in number inputs  
function preventNonNumericalInput(e) {
    
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);
    // used to limit the input lenght
    if(this.value.length==6){  
        e.preventDefault();
    }
    // used to limit the input lenght in custom button
    if(this.classList.contains("custom") && this.value.length == 3){
        e.preventDefault();
    }
    //using regex to prevent no numerical caracther
    if (!charStr.match(/^[0-9,.]+$/))
      e.preventDefault();
}
// Function used to remove error messages and error outline around inputs
function removeError(){
    let errors=document.querySelectorAll(".input-error")
    if(errors.length>0){
        errors.forEach(element=>{
            element.previousElementSibling.children[0].classList.remove("error-active");
            element.classList.remove("input-error");
        })
    }
}
// Reset the form with buttons and custom button
function resetForm(){
    this.classList.remove("reset-btn-active")
    if(document.querySelector(".btn-active")){
        document.querySelector(".btn-active").classList.remove("btn-active");
    }
    
    document.querySelector(".custom").value="Custom";
    this.disabled="disabled"
    document.querySelector("form").reset()
}
// Adding events to number inputs to remove errors and avoid no numerical characters
document.querySelectorAll("input[type='number']").forEach((element)=>{
    element.addEventListener("keypress",preventNonNumericalInput);
    element.addEventListener("focus",removeError);
})
// Adding events to reset button in order to reset the form
document.querySelector(".reset-btn").addEventListener("click",resetForm);
// Setting percentage buttons with getResult function in order to calculate output results
let calcButtons= document.querySelectorAll(".calc");
calcButtons.forEach((element) => {
    element.addEventListener("click", getResult);
})
// getResult function used to calculate porcentages
function getResult(...args){
    //Remove active status from buttons
    if(document.querySelector(".btn-active")){
        document.querySelector(".btn-active").classList.remove("btn-active");
    }
    // Selector used deppending of arguments of the function
    let selector = args[0]== 1 ? document.querySelector(".custom") : this;
    //Remove the porcetage symbol from button to get just its number
    let porc= selector.value.slice(0,-1)
    //Setting inputs and outputs into variables
    let inputs= document.querySelectorAll(".input-amount");
    let outputs= document.querySelectorAll(".output-amount");
    let validation = true;
    let total1;
    let totalBill;
    let tip;
    //Setting reset button
    let reset = document.querySelector(".reset-btn");
    inputs.forEach((element)=>{
        //If inputs are empty or its value is zero, then stop the function and adds message error
        if(element.value=="" || element.value <=0 ){
            element.previousElementSibling.children[0].classList.add("error-active");
            element.classList.add("input-error");
            validation = false;
        }
        
    })
    // if there is no error then preceeds to calculate
    if(validation){
        //put this button in a active status
        if(selector==this){
            this.classList.add("btn-active");
        }
        // operations 
        total1 = (inputs[0].value / inputs[1].value);
        tip =  ((total1.toFixed(1) * porc ) / 100);
        totalBill = total1 + tip;
        // put results into output fields
        outputs[0].value = tip.toFixed(3).slice(0,-1);
        outputs[1].value = totalBill.toFixed(2);
        //activate reset button
        reset.disabled=false;
        reset.classList.add("reset-btn-active");
    }
}
//Adds event to custom button
document.querySelector(".custom").addEventListener("click", (e)=>{
    //change the input type of custom button in order to input the custom porcentage
    e.target.type="number";
    //Adding preventNonNumericalInput to avoid no numerical characters
    e.target.addEventListener("keypress",preventNonNumericalInput);
})
//Adds blur event to custom button, this will be executed if user click outside the input field
document.querySelector(".custom").addEventListener("blur", (e)=>{
    //change the input type back to button
    e.target.type="button";
    //Avoid insert porcentage symbol twice
    if(!e.target.value.includes("%") && !isNaN(e.target.value)){
        e.target.value+="%";
        
    }
    //if input data in custom button is numerical then execute the getResult function
    if(!isNaN(e.target.value.slice(0,-1))){
        getResult(1);
    }
    
})