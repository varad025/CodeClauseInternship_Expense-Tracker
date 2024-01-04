document.addEventListener('DOMContentLoaded', () => {
    const balanceElement = document.getElementById('balance');
    const textInput = document.getElementById('text');
    const amountInput = document.getElementById('amount');
    const addExpenseButton = document.getElementById('addExpense');
    const expensesList = document.getElementById('expenses');
  
    let balance = 0;
    let expenses = [];
  
    // Event listener for adding an expense
    addExpenseButton.addEventListener('click', () => {
      const text = textInput.value;
      const amount = parseFloat(amountInput.value);
  
      if (text !== '' && !isNaN(amount) && amount > 0) {
        const expense = {
          id: new Date().getTime(),
          text,
          amount
        };

        expenses.push(expense);
        updateUI();
        updateLocalStorage();
  
        // Clear input fields
        textInput.value = '';
        amountInput.value = '';
      }
    });
  
    // Event listener for deleting an expense
    expensesList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const expenseId = parseInt(e.target.dataset.id);
        expenses = expenses.filter(expense => expense.id !== expenseId);
        updateUI();
        updateLocalStorage();
      }
    });
  
    // Function to update the UI
    function updateUI() {
      calculateBalance();
      updateBalanceUI();
      updateExpensesUI();
    }
  
    // Function to calculate the balance
    function calculateBalance() {
      balance = expenses.reduce((total, expense) => total - expense.amount, 0);
    }
  
    // Function to update the balance in the UI
    function updateBalanceUI() {
      balanceElement.textContent = `$${balance.toFixed(2)}`;
      balanceElement.style.color = balance < 0 ? '#e74c3c' : '#2ecc71';
    }
  
    // Function to update the expenses in the UI
    function updateExpensesUI() {
      expensesList.innerHTML = '';
      expenses.forEach(expense => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <span>${expense.text}</span>
          <span>$${expense.amount.toFixed(2)}</span>
          <button class="delete-btn" data-id="${expense.id}">Delete</button>
        `;
        expensesList.appendChild(listItem);
      });
    }
  
    // Function to update local storage
    function updateLocalStorage() {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  
    // Function to retrieve data from local storage on page load
    function retrieveDataFromLocalStorage() {
      const localStorageExpenses = JSON.parse(localStorage.getItem('expenses'));
      if (localStorageExpenses) {
        expenses = localStorageExpenses;
        updateUI();
      }
    }
  
    // Initialize the app
    retrieveDataFromLocalStorage();
  });
  