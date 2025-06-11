const SUPABASE_URL = "https://jzgggmbyymyrkclpxpes.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6Z2dnbWJ5eW15cmtjbHB4cGVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMDAyMTUsImV4cCI6MjA2NDg3NjIxNX0.O66G0CNCSUajrXWxq8djO4vj73FFy9IROzX0pKkdT4k";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

supabase.auth.getUser().then(({ data: { user } }) => {
  if (!user) {
    window.location.href = "auth.html";
  }
});

document.getElementById('logout-btn').addEventListener('click', async () => {
  await supabase.auth.signOut();
  window.location.href = "auth.html";
});

// --- Transaction logic using localStorage ---
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Utility: Format currency
function formatCurrency(amount) {
  return "$" + amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Utility: Get current month/year
function getCurrentMonthYear() {
  const now = new Date();
  return { month: now.getMonth(), year: now.getFullYear() };
}

// --- Update Dashboard Cards ---
function updateDashboard() {
  const { month, year } = getCurrentMonthYear();

  // Filter for current month
  const thisMonthTx = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });

  // Monthly Spending
  const totalSpending = thisMonthTx
    .filter(t => t.type !== 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  // Budget (example: $1500)
  const budget = 1500;
  const budgetLeft = budget - totalSpending;
  const budgetPercent = Math.min(100, Math.round((totalSpending / budget) * 100));

  // Top Category
  const categoryTotals = {};
  thisMonthTx.filter(t => t.type !== 'income').forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });
  let topCategory = "N/A";
  let topCategoryPercent = 0;
  if (Object.keys(categoryTotals).length > 0) {
    const maxCat = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
    topCategory = maxCat[0];
    topCategoryPercent = Math.round((maxCat[1] / totalSpending) * 100);
  }

  // Tracking Streak (dummy: 24 days)
  const trackingStreak = 24;

  // Update DOM
  document.getElementById('monthly-spending').textContent = formatCurrency(totalSpending);
  document.getElementById('budget-status').textContent = formatCurrency(budgetLeft) + " left";
  document.querySelector('.progress').style.width = `${budgetPercent}%`;
  document.getElementById('top-category').textContent = topCategory;
  document.getElementById('tracking-streak').textContent = trackingStreak + " days";
  document.getElementById('top-category-desc').textContent = `${topCategoryPercent}% of total spending`;
  document.getElementById('budget-progress-label').textContent = `${budgetPercent}% of $${budget}`;

  // Spending change (dummy: 12% decrease)
  document.getElementById('spending-change').textContent = "12% decrease";
}

// --- Update Charts ---
function updateCharts() {
  // Donut Chart
  const categoryTotals = {};
  transactions.filter(t => t.type !== 'income').forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  // Always show all categories in the legend/colors
  const allCategories = [
    "Food & Dining", "Groceries", "Shopping", "Utilities", "Entertainment", "Transport", "Other"
  ];
  const chartColors = [
    '#7c3aed', '#06b6d4', '#f472b6', '#fbbf24', '#34d399', '#60a5fa', '#a3a3a3'
  ];
  const data = allCategories.map(cat => categoryTotals[cat] || 0);

  // Destroy previous chart if exists
  if (window.categoryChart) window.categoryChart.destroy();
  const categoryCtx = document.getElementById('categoryChart').getContext('2d');
  window.categoryChart = new Chart(categoryCtx, {
    type: 'doughnut',
    data: {
      labels: allCategories,
      datasets: [{
        data: data,
        backgroundColor: chartColors,
      }]
    },
    options: {
      plugins: { legend: { display: true, position: 'right' } }
    }
  });

  // Line Chart (Monthly Spending Trend)
  const months = [];
  const monthTotals = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const label = d.toLocaleString('default', { month: 'short' });
    months.push(label);
    const monthNum = d.getMonth();
    const yearNum = d.getFullYear();
    const sum = transactions.filter(t => {
      const td = new Date(t.date);
      return t.type !== 'income' && td.getMonth() === monthNum && td.getFullYear() === yearNum;
    }).reduce((sum, t) => sum + t.amount, 0);
    monthTotals.push(sum);
  }

  if (window.trendChart) window.trendChart.destroy();
  const trendCtx = document.getElementById('trendChart').getContext('2d');
  window.trendChart = new Chart(trendCtx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: 'Spending',
        data: monthTotals,
        borderColor: '#7c3aed',
        backgroundColor: 'rgba(124,58,237,0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
      }]
    },
    options: {
      plugins: { legend: { display: false } }
    }
  });
}

// --- Render Expenses Table ---
function renderExpenses() {
  const tbody = document.getElementById('expenses-list');
  tbody.innerHTML = '';
  // Show most recent first
  transactions.slice().reverse().forEach(exp => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${exp.date}</td>
      <td>${exp.category}</td>
      <td>${formatCurrency(exp.amount)}</td>
      <td>${exp.note || ''}</td>
      <td><button class="delete-expense-btn" data-id="${exp.id}">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });

  // Add delete listeners
  document.querySelectorAll('.delete-expense-btn').forEach(btn => {
    btn.onclick = function() {
      const id = Number(this.getAttribute('data-id'));
      transactions = transactions.filter(e => e.id !== id);
      localStorage.setItem('transactions', JSON.stringify(transactions));
      updateDashboard();
      updateCharts();
      renderExpenses();
    };
  });
}

// --- Add Expense Modal Logic ---
const addExpenseBtn = document.getElementById('add-expense-btn');
const expenseModal = document.getElementById('expense-modal');
const closeExpenseModal = document.getElementById('close-expense-modal');

if (addExpenseBtn && expenseModal && closeExpenseModal) {
  addExpenseBtn.addEventListener('click', () => {
    expenseModal.style.display = 'flex';
  });
  closeExpenseModal.addEventListener('click', () => {
    expenseModal.style.display = 'none';
  });
  window.addEventListener('click', (e) => {
    if (e.target === expenseModal) expenseModal.style.display = 'none';
  });
}

// --- Handle Expense Form Submission ---
const expenseForm = document.getElementById('expense-form');
if (expenseForm) {
  expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;
    const date = document.getElementById('expense-date').value;
    const note = document.getElementById('expense-note').value;
    if (!amount || !category || !date) return;

    transactions.push({
      id: Date.now(),
      type: 'expense',
      amount,
      category,
      date,
      note
    });
    localStorage.setItem('transactions', JSON.stringify(transactions));
    expenseModal.style.display = 'none';
    expenseForm.reset();
    updateDashboard();
    updateCharts();
    renderExpenses();
  });
}

// --- Initial Render ---
document.addEventListener('DOMContentLoaded', () => {
  updateDashboard();
  updateCharts();
  renderExpenses();
});