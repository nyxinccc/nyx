// Función para mostrar secciones al hacer clic en el menú
function showSection(id){
  const sections = ['plansSection','dashboard','news','faq'];
  sections.forEach(sec => {
    document.getElementById(sec).style.display = (sec===id) ? 'block' : 'none';
  });
}
// Usuarios guardados en localStorage (simulado)
function registerUser() {
  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;

  if(!username || !password){
    alert("Completa todos los campos");
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || {};
  if(users[username]){
    alert("Usuario ya existe");
    return;
  }

  users[username] = { password: password, balance: 0, plan: null };
  localStorage.setItem('users', JSON.stringify(users));
  alert("Registro exitoso! Ahora haz login.");
  document.getElementById('regUsername').value = '';
  document.getElementById('regPassword').value = '';
}

function loginUser() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  let users = JSON.parse(localStorage.getItem('users')) || {};
  if(!users[username] || users[username].password !== password){
    alert("Usuario o contraseña incorrectos");
    return;
  }

  alert("Login exitoso!");
  // Guardamos usuario actual
  localStorage.setItem('currentUser', username);
  document.getElementById('auth').style.display = 'none';
  document.getElementById('plansSection').style.display = 'block';
  document.getElementById('dashboard').style.display = 'block';
  updateDashboard();
}
