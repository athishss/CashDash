const SUPABASE_URL = "https://jzgggmbyymyrkclpxpes.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6Z2dnbWJ5eW15cmtjbHB4cGVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMDAyMTUsImV4cCI6MjA2NDg3NjIxNX0.O66G0CNCSUajrXWxq8djO4vj73FFy9IROzX0pKkdT4k";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- Slider logic for double sign in/up form ---
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

if (signUpButton && signInButton && container) {
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
}

// --- Sign Up ---
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  // Optionally, get name or other fields

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    // options: { data: { name: ... } }
  });

  if (error) {
    alert(error.message);
  } else {
    alert('Sign up successful! Please check your email to confirm.');
  }
});

// --- Sign In ---
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
  } else {
    alert('Login successful!');
    // Redirect to dashboard or wherever you want
    window.location.href = "dashboard.html";
  }
});