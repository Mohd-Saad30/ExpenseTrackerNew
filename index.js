const EnterBudget = document.getElementById("Budget");
const ExpenseName = document.getElementById("title");
const ExpenseDate = document.getElementById("ExpenseDate");
const category = document.getElementById("Category");
const ExpenseAmount = document.getElementById("Amount");
const addingBudgetButton = document.getElementById("ADDINGBUDGET");
const AddExpenseButton = document.getElementById("AddExpense");
const resetall = document.getElementById("reset");
const budgetPara = document.getElementById("budgetp");
const ExpensesPara = document.getElementById("Expensesp");
const budgetLeftPara = document.getElementById("budgetLeftp");
const tableBody = document.getElementById("table_body");

let budgetValue = 0;
let leftAmount = 0;
let totalExpense = 0;
let serialNumber = 1;

addingBudgetButton.disabled = true;
addingBudgetButton.style.cursor = "not-allowed";
// ====== PAGINATION VARIABLES ====== //
let expenses = []; // Store all expenses as objects
let currentPage = 1;
const rowsPerPage = 7;
// ================================== //

AddExpenseButton.disabled = true;
AddExpenseButton.style.cursor = "not-allowed";

const addExp = document.getElementById("addExp");

// ====== FILTER ELEMENTS ====== //
const filterSelect = document.getElementById('filter');
const dateInput = document.getElementById('dateInput');
const categoryFilter = document.getElementById('CategoryFilter');

// ====== localStorage: SAVE DATA FUNCTION ====== //
function saveDataToLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  localStorage.setItem("budgetValue", budgetValue);
  localStorage.setItem("leftAmount", leftAmount);
  localStorage.setItem("totalExpense", totalExpense);
  localStorage.setItem("currentPage", currentPage);
}
// ============================================== //

// ====== localStorage: LOAD DATA FUNCTION ====== //
function loadDataFromLocalStorage() {
  const savedExpenses = localStorage.getItem("expenses");
  const savedBudgetValue = localStorage.getItem("budgetValue");
  const savedLeftAmount = localStorage.getItem("leftAmount");
  const savedTotalExpense = localStorage.getItem("totalExpense");
  const savedCurrentPage = localStorage.getItem("currentPage");

  if (savedExpenses) expenses = JSON.parse(savedExpenses);
  if (savedBudgetValue) budgetValue = Number(savedBudgetValue);
  if (savedLeftAmount) leftAmount = Number(savedLeftAmount);
  if (savedTotalExpense) totalExpense = Number(savedTotalExpense);
  if (savedCurrentPage) currentPage = Number(savedCurrentPage);

  budgetPara.innerHTML = `${budgetValue}`;
  budgetLeftPara.innerHTML = `${leftAmount}`;
  ExpensesPara.innerHTML = `${totalExpense}`;
  renderTable();

  // === HIGHLIGHTED: Enable Add Expense if budget exists ===
  if (budgetValue > 0) {
    AddExpenseButton.disabled = false;
    AddExpenseButton.style.cursor = "default";
    addExp.classList.remove("hidden");
    addExp.classList.add("active");
  } else {
    AddExpenseButton.disabled = true;
    AddExpenseButton.style.cursor = "not-allowed";
    addExp.classList.add("hidden");
    addExp.classList.remove("active");
  }
}
// ============================================== //

function tablework() {
  // Store each expense as an object in expenses array
  const expense = {
    date: ExpenseDate.value,
    name: ExpenseName.value,
    category: category.value,
    amount: ExpenseAmount.value
  };
  expenses.push(expense);
  saveDataToLocalStorage();
  renderTable();
}

// ====== FILTER + PAGINATION SUPPORT ====== //
function renderTable() {
  tableBody.innerHTML = ""; // Clear table

  // --- Filtering ---
  const filterType = filterSelect.value;
  const filterDate = dateInput.value;
  const filterCategoryValue = categoryFilter.value;

  let filteredExpenses = expenses;

  if (filterType === 'date' && filterDate) {
    filteredExpenses = expenses.filter(exp => exp.date === filterDate);
  } else if (filterType === 'category' && filterCategoryValue) {
    filteredExpenses = expenses.filter(exp => exp.category === filterCategoryValue);
  }

  // --- Pagination ---
  const start = (currentPage - 1) * rowsPerPage;//0
  const end = start + rowsPerPage;              //7
  const pageExpenses = filteredExpenses.slice(start, end); //0-6

  pageExpenses.forEach((expense, index) => {
    const newRow = document.createElement("tr");

    // Serial number for current page
    const serialCell = document.createElement("td");
    serialCell.textContent = start + index + 1;

    const dateCell = document.createElement("td");
    dateCell.textContent = expense.date;

    const nameCell = document.createElement("td");
    nameCell.textContent = expense.name;

    const categoryCell = document.createElement("td");
    categoryCell.textContent = expense.category;

    const amountCell = document.createElement("td");
    amountCell.textContent = expense.amount;

    // Delete button
    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("remove_button");
    deleteButton.style.backgroundColor = "red";
    deleteButton.addEventListener("click", () => {
      // Find the index in the main expenses array
      const realIndex = expenses.findIndex(
        exp => exp.date === expense.date &&
               exp.name === expense.name &&
               exp.category === expense.category &&
               exp.amount === expense.amount
      );
      if (realIndex !== -1) {
        expenses.splice(realIndex, 1);//(startIndex, deleteCount);
        // Update totals
        totalExpense -= Number(expense.amount);
        leftAmount = budgetValue - totalExpense;
        ExpensesPara.innerHTML = `${totalExpense}`;
        budgetLeftPara.innerHTML = `${leftAmount}`;
        // If deleting last item on last page, go to previous page
        if (currentPage > 1 && start >= filteredExpenses.length - 1) {
          currentPage--;
        }
        saveDataToLocalStorage();
        renderTable();
      }
    });
    deleteCell.appendChild(deleteButton);

    newRow.appendChild(serialCell);
    newRow.appendChild(dateCell);
    newRow.appendChild(nameCell);
    newRow.appendChild(categoryCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(deleteCell);

    tableBody.appendChild(newRow);
  });

  renderPagination(filteredExpenses);
}

function renderPagination(filteredExpenses = expenses) {
  // Remove old pagination row if exists
  const oldRow = document.getElementById("paginationRow");
  if (oldRow) oldRow.remove();

  if (filteredExpenses.length > rowsPerPage) {
    const paginationRow = document.createElement("tr");
    paginationRow.id = "paginationRow";

    const prevBtnCell = document.createElement("td");
    const nextBtnCell = document.createElement("td");
    prevBtnCell.colSpan = 3;
    nextBtnCell.colSpan = 3;

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous";
    prevBtn.id = "prevBtn";
    prevBtn.disabled = currentPage === 1;
    prevBtnCell.appendChild(prevBtn);

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.id = "nextBtn";
    nextBtn.disabled = currentPage >= Math.ceil(filteredExpenses.length / rowsPerPage);
    nextBtnCell.appendChild(nextBtn);

    paginationRow.appendChild(prevBtnCell);
    paginationRow.appendChild(nextBtnCell);
    tableBody.appendChild(paginationRow);

    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        saveDataToLocalStorage();
        renderTable();
      }
    });

    nextBtn.addEventListener("click", () => {
      if (currentPage < Math.ceil(filteredExpenses.length / rowsPerPage)) {
        currentPage++;
        saveDataToLocalStorage();
        renderTable();
      }
    });
  }
}

EnterBudget.addEventListener("input", (e) => {
  if (!isNaN(EnterBudget.value) && EnterBudget.value > 0 && EnterBudget.value!="")  {
    addingBudgetButton.disabled = false;
    addingBudgetButton.style.cursor = "default";
  } else {
    addingBudgetButton.disabled = true;
    addingBudgetButton.style.cursor = "not-allowed";
  }
});

addingBudgetButton.addEventListener("click", (e) => {
  budgetValue += Number(EnterBudget.value);
  leftAmount += Number(EnterBudget.value);
  console.log("The value is:", EnterBudget.value.trim());
  budgetPara.innerHTML = `${budgetValue}`;
  budgetLeftPara.innerHTML = `${leftAmount}`;
  AddExpenseButton.disabled = false;
  AddExpenseButton.style.cursor = "default";

  addExp.classList.remove("hidden"); // Removes hidden so the div becomes visible
  addExp.classList.add("active");

  saveDataToLocalStorage();
//toast
  showToast("Budget added successfully!");
});

AddExpenseButton.addEventListener("click", (e) => {
  if (isNaN(ExpenseName.value)) {
    console.log(ExpenseName.value);
  } else {
    alert("write name in alphabet ");
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
    totalExpense = 0;
    leftAmount = budgetValue;
    alert("ERROR: Budget is insufficient for this expense.");
    return;
  }
   
  tablework();
  //toast
  showToast("Expense Details  added successfully!");
});

resetall.addEventListener("click", () => {
  tableBody.innerHTML = "";
  serialNumber = 1;
  totalExpense = 0;
  leftAmount = budgetValue = 0;
  budgetPara.innerHTML = `${budgetValue}`;
  budgetLeftPara.innerHTML = `${leftAmount}`;
  ExpensesPara.innerHTML = `${totalExpense}`;
  AddExpenseButton.disabled = true;
  AddExpenseButton.style.cursor = "not-allowed";
  EnterBudget.value = "";
  ExpenseName.value = "";
  category.value = "";
  ExpenseDate.value = "";
  ExpenseAmount.value = "";

  // ====== RESET PAGINATION DATA ====== //
  expenses = [];
  currentPage = 1;
  saveDataToLocalStorage();
  renderTable();
  // =================================== //
});

// ====== INITIAL TABLE RENDER WITH LOADING FROM STORAGE ====== //
loadDataFromLocalStorage();
// ================================== //

// ====== FILTER EVENT LISTENERS ====== //
filterSelect.addEventListener('change', function() {
  dateInput.style.display = 'none';
  categoryFilter.style.display = 'none';
  dateInput.value = '';
  categoryFilter.value = '';
  currentPage = 1;
  if (this.value === 'date') {
    dateInput.style.display = 'inline-block';
  } else if (this.value === 'category') {
    categoryFilter.style.display = 'inline-block';
  }
  renderTable();
});
dateInput.addEventListener('change', function() {
  currentPage = 1;
  renderTable();
});
categoryFilter.addEventListener('change', function() {
  currentPage = 1;
  renderTable();
});


//toast
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.textContent = message;

  toast.style.cssText = `
    padding: 10px 20px;
    color: white;
    border-radius: 5px;
    margin-top: 45px;
    font-weight: bold;
    background-color: ${type === "success" ? "#4CAF50" : "#f44336"};
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
  `;

  document.getElementById("toast-container").appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}


