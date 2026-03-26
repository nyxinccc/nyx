function showSection(id){
  const sections = ['auth','plansSection','dashboard','news','faq'];
  sections.forEach(sec => {
    document.getElementById(sec).style.display = (sec===id) ? 'block' : 'none';
  });
}

// Registro/Login
function registerUser() {
  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;
  if(!username || !password){ alert("Completa todos los campos"); return; }

  let users = JSON.parse(localStorage.getItem('users')) || {};
  if(users[username]){ alert("Usuario ya existe"); return; }

  users[username] = { password, balance:0, plan:null, bank:null };
  localStorage.setItem('users', JSON.stringify(users));
  alert("Registro exitoso! Haz login.");
  document.getElementById('regUsername').value = '';
  document.getElementById('regPassword').value = '';
}

function loginUser() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  let users = JSON.parse(localStorage.getItem('users')) || {};

  if(!users[username] || users[username].password !== password){
    alert("Usuario o contraseña incorrectos"); return;
  }

  localStorage.setItem('currentUser', username);
  document.getElementById('auth').style.display='none';
  document.getElementById('plansSection').style.display='block';
  document.getElementById('dashboard').style.display='block';
  updateDashboard();
}

// Guardar datos bancarios
function saveBankInfo(){
  const username = localStorage.getItem('currentUser');
  if(!username) return;
  let users = JSON.parse(localStorage.getItem('users'));
  const bcpNumber = document.getElementById('bcpNumber').value;
  const bcpName = document.getElementById('bcpName').value;
  if(!bcpNumber || !bcpName){ alert("Completa ambos campos"); return; }

  users[username].bank = { number:bcpNumber, name:bcpName };
  localStorage.setItem('users', JSON.stringify(users));
  alert("Datos bancarios guardados");
  updateDashboard();
}

// Planes
const planData = { "700":{daily:15}, "1000":{daily:29}, "1500":{daily:59} };
document.querySelectorAll('.plan').forEach((planDiv,index)=>{
  planDiv.addEventListener('click',()=>{
    const username = localStorage.getItem('currentUser');
    if(!username){ alert("Haz login primero"); return; }
    const planKeys = ["700","1000","1500"];
    let users = JSON.parse(localStorage.getItem('users'));
    users[username].plan = planKeys[index];
    users[username].balance = parseInt(planKeys[index]);
    localStorage.setItem('users', JSON.stringify(users));
    alert(`Plan ${planKeys[index]} seleccionado!`);
    updateDashboard();
  });
});

// Dashboard
function updateDashboard(){
  const username = localStorage.getItem('currentUser');
  if(!username) return;
  let users = JSON.parse(localStorage.getItem('users'));
  const user = users[username];

  document.getElementById('userNameDisplay').innerText = username;
  document.getElementById('userPlanDisplay').innerText = user.plan || "Ninguno";
  document.getElementById('userBalanceDisplay').innerText = user.balance;

  if(user.bank){
    document.getElementById('bankInfoDisplay').innerText =
      `Cuenta BCP: ${user.bank.number} | Titular: ${user.bank.name}`;
  } else { document.getElementById('bankInfoDisplay').innerText = ""; }

  // Mostrar wallet USDT
  const wallet = "TB1vZrQ5RFKTsfZc3VeckfPxf4tS6pAhF5";
  document.getElementById('usdtWallet').innerText = wallet;
}

// Copiar wallet al portapapeles
function copyWallet(){
  const wallet = document.getElementById('usdtWallet').innerText;
  navigator.clipboard.writeText(wallet).then(()=>alert("Wallet copiada al portapapeles!"));
}

// Depósito simulado
function deposit(){
  const username = localStorage.getItem('currentUser');
  let users = JSON.parse(localStorage.getItem('users'));
  users[username].balance += 500; 
  localStorage.setItem('users', JSON.stringify(users));
  alert(`Depósito simulado de S/.500 agregado a tu balance.\nWallet USDT: TB1vZrQ5RFKTsfZc3VeckfPxf4tS6pAhF5`);
  updateDashboard();
}

// Retiro simulado
function withdraw(){
  const username = localStorage.getItem('currentUser');
  let users = JSON.parse(localStorage.getItem('users'));
  const bank = document.getElementById('withdrawBank').value;
  if(!bank){ alert("Selecciona un banco"); return; }
  if(users[username].balance < 500){ alert("Balance insuficiente, mínimo retiro 500 soles"); return; }

  users[username].balance -= 500;
  localStorage.setItem('users', JSON.stringify(users));
  alert(`Retiro simulado a tu banco ${bank} confirmado.\nFondos enviados en 5-10 días.`);
  updateDashboard();
}
