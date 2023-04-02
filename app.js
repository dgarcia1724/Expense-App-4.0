// Budget
const inputEnterTotalAmount = document.querySelector(".inputEnterTotalAmount");
const btnSetBudget = document.querySelector(".btnSetBudget");

// Expenses
const inputEnterTitle = document.querySelector(".inputEnterTitle");
const inputEnterCost = document.querySelector(".inputEnterCost");
const btnCheckAmount = document.querySelector(".btnCheckAmount");

// 3 COLUMNS
const displayTotalBudget = document.querySelector(".displayTotalBudget");
const displayExpenses = document.querySelector(".displayExpenses");
const displayBalance = document.querySelector(".displayBalance");

// Variables
let currentTotalBudget = 0;
let currentExpenses = 0;
let currentBalance = 0;

// Expense List
const expenseList = document.querySelector(".expenseList");

// update Columns
const updateColumns = function () {
  currentBalance = currentTotalBudget - currentExpenses;

  displayTotalBudget.innerHTML = currentTotalBudget;
  displayExpenses.innerHTML = currentExpenses;
  displayBalance.innerHTML = currentBalance;
};

// BUTTON Budget
btnSetBudget.addEventListener("click", function () {
  if (inputEnterTotalAmount.value >= 0) {
    currentTotalBudget = Number(inputEnterTotalAmount.value);
    updateColumns();
  }
});

// BUTTON Expenses
btnCheckAmount.addEventListener("click", function () {
  if (!inputEnterTitle.value == "" && inputEnterCost.value >= 0) {
    currentExpenses += Number(inputEnterCost.value);
    updateColumns();
    const itemTitle = inputEnterTitle.value;
    const itemCost = inputEnterCost.value;
    expenseList.innerHTML += `
      <div class='item'>
        <span class='itemTitle'>${itemTitle}</span>
        <span class='itemCost'>${itemCost}</span>
        <button class='edit'>Edit</button>
        <button class='update'>Update</button>
        <button class='deleteX'>X</button>
      </div>
    `;
    // Select Individual Item
    const item = document.querySelectorAll(".item");
    // delete Individual Item
    for (let i = 0; i < item.length; i++) {
      item[i].querySelector(".deleteX").addEventListener("click", function () {
        const itemCostX = Number(item[i].querySelector(".itemCost").innerHTML);

        // SUBTRACT Cost
        currentExpenses -= itemCostX;
        updateColumns();

        item[i].remove();
      });
    }

    // edit Individual Item
    for (let i = 0; i < item.length; i++) {
      // ******* EDIT Btn Clicked *********
      item[i].querySelector(".edit").addEventListener("click", function () {
        const itemTitleX = item[i].querySelector(".itemTitle").innerHTML;
        const itemCostX = Number(item[i].querySelector(".itemCost").innerHTML);

        // SUBTRACT Cost
        currentExpenses -= itemCostX;
        updateColumns();

        // ADD TITLE INPUT after edit btn pushed
        item[i].querySelector(".itemTitle").innerHTML = `
          <input class='editTitle' type='text' >
        `;
        item[i].querySelector(".editTitle").value = itemTitleX;

        // ADD COST INPUT after edit btn pushed
        item[i].querySelector(".itemCost").innerHTML = `
          <input class='editCost' type='text'>
        `;
        item[i].querySelector(".editCost").value = itemCostX;

        // ADD Update Btn
        const updateBtn = item[i].querySelector(".update");
        updateBtn.style.display = "block";
        // HIDE Edit Btn
        item[i].querySelector(".edit").style.display = "none";
        // Disable deleteX
        item[i].querySelector(".deleteX").disabled = true;
        // ******* UPDATE Btn Clicked *********
        updateBtn.addEventListener("click", function () {
          // ADD Cost
          currentExpenses += Number(item[i].querySelector(".editCost").value);
          updateColumns();

          // Title
          item[i].querySelector(".itemTitle").innerHTML =
            item[i].querySelector(".editTitle").value;
          // Cost
          item[i].querySelector(".itemCost").innerHTML =
            item[i].querySelector(".editCost").value;

          // SHOW Edit Btn
          item[i].querySelector(".edit").style.display = "block";
          // Enable deleteX
          item[i].querySelector(".deleteX").disabled = false;

          // Hide
          updateBtn.style.display = "none";
        });
      });
    }
  }
});
