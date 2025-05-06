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
    const DeleteCell = document.createElement("td");

    // Create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.backgroundColor="red";

    function updateSerialNumbers() {
        const rows = tableBody.querySelectorAll("tr");
        serialNumber = 1; // Reset serial number
        rows.forEach(row => {
          row.cells[0].textContent = serialNumber++; // Update the first cell (serial number)
        })
    }
    
    // Add an event listener to handle the delete action
    deleteButton.addEventListener("click", () => {
      DeleteCell.parentElement.remove(); // Removes the entire row
      updateSerialNumbers()
    });
    
    // Append the button to the cell
    DeleteCell.appendChild(deleteButton);
    
    // Append all cells to the row
    newRow.appendChild(serialCell);
    newRow.appendChild(dateCell);
    newRow.appendChild(expenseNameCell);
    newRow.appendChild(categoryCell);
    newRow.appendChild(amountCell)
    newRow.appendChild(DeleteCell)





    tableBody.append(newRow)

}


const addExp = document.getElementById("addExp");







EnterBudget.addEventListener('input',(e)=>{
    
if(!isNaN(EnterBudget.value) && EnterBudget.value>0){
   
    addingBudgetButton.disabled=false;
    addingBudgetButton.style.cursor="default";
    
  

}
else{
    addingBudgetButton.disabled=true;
    addingBudgetButton.style.cursor="not-allowed";
    
   
    
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
    
    
    addExp.classList.remove("hidden"); // Removes hidden so the div becomes visible
    addExp.classList.add("active");
    

    
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
            totalExpense=0;
            leftAmount = budgetValue;
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
     budgetPara.innerHTML = `${budgetValue}`
    budgetLeftPara.innerHTML = `${leftAmount}`;
    ExpensesPara.innerHTML = `${totalExpense}`;
    AddExpenseButton.disabled=true;
    AddExpenseButton.style.cursor='not-allowed';
    EnterBudget.value='';
    ExpenseName.value='';
    category.value='';
    ExpenseDate.value='';
    ExpenseAmount.value='';

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

