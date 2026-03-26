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
const planData = {
  "700": { daily:15 },
  "1000": { daily:29 },
  "1500": { daily:59 }
};

document.querySelectorAll('.plan').forEach((planDiv, index)=>{
  planDiv.addEventListener('click',()=>{
    const username = localStorage.getItem('currentUser');
    if(!username) { alert("Haz login primero"); return; }

    const planKeys = ["700","1000","1500"];
    let users = JSON.parse(localStorage.getItem('users'));
    users[username].plan = planKeys[index];
    users[username].balance = parseInt(planKeys[index]);
    localStorage.setItem('users', JSON.stringify(users));
    alert(`Plan ${planKeys[index]} seleccionado!`);
    updateDashboard();
  });
});
function updateDashboard(){
  const username = localStorage.getItem('currentUser');
  if(!username) return;
  let users = JSON.parse(localStorage.getItem('users'));
  const user = users[username];
  
  document.getElementById('dashboard').innerHTML = `
    <h2>Dashboard</h2>
    <p>Usuario: ${username}</p>
    <p>Plan seleccionado: ${user.plan || "Ninguno"}</p>
    <p>Balance: S/. ${user.balance}</p>
    <button onclick="deposit()">Depositar 500 simulados</button>
    <button onclick="withdraw()">Retirar mínimo 500 simulados</button>
  `;
}
function deposit(){
  const username = localStorage.getItem('currentUser');
  let users = JSON.parse(localStorage.getItem('users'));
  users[username].balance += 500; // depósito simulado
  localStorage.setItem('users', JSON.stringify(users));
  alert("Depósito de S/.500 agregado");
  updateDashboard();
}

function withdraw(){
  const username = localStorage.getItem('currentUser');
  let users = JSON.parse(localStorage.getItem('users'));
  if(users[username].balance < 500){
    alert("Balance insuficiente, mínimo para retirar: 500");
    return;
  }
  users[username].balance -= 500; // retiro 
  localStorage.setItem('users', JSON.stringify(users));
  alert("Fondos enviados a tu banco (5-20 días de espera)");
  updateDashboard();
}
