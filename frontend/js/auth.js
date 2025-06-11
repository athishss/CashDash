const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

// --- Your authentication logic can go below ---
console.log("auth.js loaded");

// Sign Up
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

// Sign In
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