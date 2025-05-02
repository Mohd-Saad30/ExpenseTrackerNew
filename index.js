const EnterBudget= document.getElementById("Budget");
const ExpenseName= document.getElementById("title");
const ExpenseDate= document.getElementById("ExpenseDate");
const category = document.getElementById('Category');
const ExpenseAmount = document.getElementById('Amount');
const addingBudgetButton= document.getElementById('ADDINGBUDGET')
const AddExpenseButton = document.getElementById('AddExpense')
const resetall= document.getElementById("reset");
const budgetPara=document.getElementById("budgetp");
const ExpensesPara = document.getElementById("Expensesp");
const budgetLeftPara = document.getElementById("budgetLeftp");
const tableBody= document.getElementById('table_body');

let budgetValue=0;
let leftAmount=0;
let totalExpense=0;
let serialNumber = 1;

AddExpenseButton.disabled=true;
AddExpenseButton.style.cursor='not-allowed';



function tablework(){
    const newRow = document.createElement("tr");
    
    const serialCell = document.createElement("td")
    serialCell.textContent=serialNumber++;

    const dateCell = document.createElement("td")
    dateCell.textContent=`${ExpenseDate.value}`

    const expenseNameCell = document.createElement("td")
    expenseNameCell.textContent=`${ExpenseName.value}`

    const categoryCell = document.createElement("td")
    categoryCell.textContent = `${category.value}`

    const amountCell = document.createElement("td")
    amountCell.textContent = `${ExpenseAmount.value}`;

    
    // Append all cells to the row
    newRow.appendChild(serialCell);
    newRow.appendChild(dateCell);
    newRow.appendChild(expenseNameCell);
    newRow.appendChild(categoryCell);
    newRow.appendChild(amountCell)





    tableBody.append(newRow)

}


const addExp = document.getElementById("addExp");
// Initially ensure 'addExp' is hidden
addExp.classList.remove("active");

// Event listener for when the 'EnterBudget' field is clicked (focus event)
EnterBudget.addEventListener('focus', () => {
    addExp.classList.add("active"); // Show the 'addExp' element
});



EnterBudget.addEventListener('input',(e)=>{
    
if(!isNaN(EnterBudget.value) && EnterBudget.value>0){
   
    addingBudgetButton.disabled=false;
    addingBudgetButton.style.cursor="default";
    // addexpClass.classList.add("active");

}
else{
    addingBudgetButton.disabled=true;
    addingBudgetButton.style.cursor="not-allowed";
    // addexpClass.classList.remove("active");
   
    
}
});

addingBudgetButton.addEventListener('click', (e) => {

    budgetValue+=Number(EnterBudget.value);
     leftAmount+=Number(EnterBudget.value);
    console.log("The value is:", EnterBudget.value.trim());
    budgetPara.innerHTML = `${budgetValue}`
    budgetLeftPara.innerHTML = `${leftAmount}`
    AddExpenseButton.disabled=false;
    AddExpenseButton.style.cursor='default';

    

    
  });


        
    AddExpenseButton.addEventListener('click', (e) => {
    
        
        if (isNaN(ExpenseName.value)) {  
            console.log(ExpenseName.value); 
        } else {
           alert("write name in alphabet ")
           return;
        }
    
        if (ExpenseDate.value === "") {  
            
            alert("ERROR: Date cannot be empty");
            return;
        } else {
            console.log(ExpenseDate.value); 
        }
    
        console.log(category.value); 
    
       
        if (!isNaN(ExpenseAmount.value) && ExpenseAmount.value > 0) {
            console.log("The expense amount is:", ExpenseAmount.value.trim()); 
        } else {
           
            alert("ERROR: Amount must be a number greater than 0");
            return;
        }
          
        totalExpense += Number(ExpenseAmount.value);
        leftAmount = budgetValue - totalExpense;
        
        if (budgetValue >= ExpenseAmount.value) {
            budgetLeftPara.innerHTML = `${leftAmount}`;
            ExpensesPara.innerHTML = `${totalExpense}`;
        } else {
            alert("ERROR: Budget is insufficient for this expense.");
            return;
        }
       
    
    
        //
      tablework();
        
        
    });



resetall.addEventListener('click',()=>{
    tableBody.innerHTML='';
    serialNumber=1;
    totalExpense=0;
    leftAmount = budgetValue=0;
    budgetLeftPara.innerHTML = `${leftAmount}`;
    ExpensesPara.innerHTML = `${totalExpense}`;
    AddExpenseButton.disabled=true;
    AddExpenseButton.style.cursor='not-allowed';

    // localStorage.removeItem("tableData");
})




























// window.addEventListener('load', () => {
//     const tableData = JSON.parse(localStorage.getItem("tableData")) || [];
//     serialNumber = tableData.length ? tableData[tableData.length - 1].serial + 1 : 1; // Restore serial number
//     totalExpense = tableData.reduce((total, row) => total + Number(row.amount), 0); // Calculate total expense
//     leftAmount = budgetValue - totalExpense;

//     // Update budget-related displays
//     budgetLeftPara.innerHTML = `${leftAmount}`;
//     ExpensesPara.innerHTML = `${totalExpense}`;

//     tableData.forEach(row => appendRowToTable(row));
// });



// let string = '';

// resetall.addEventListener('click', (e) => {
//         // console.log(e.target.innerHTML
    
//        if(e.target.innerHTML==AddExpenseButton.value){
//             string='';
//             display.value= string;
//         }
//         else
//             console.log("error");
        
//     });

