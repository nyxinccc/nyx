let wallet = "TB1vZrQ5RFKTsfZc3VeckfPxf4tS6pAhF5";

function show(id){
  ["auth","register","plans","dashboard"].forEach(sec=>{
    document.getElementById(sec).style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}

// REGISTRO
function register(){
  let user = regUser.value;
  let pass = regPass.value;

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if(users[user]){
    alert("Usuario existe");
    return;
  }

  users[user] = {
    pass,
    balance:0,
    plan:null,
    last:Date.now()
  };

  localStorage.setItem("users", JSON.stringify(users));
  alert("Registrado");
}

// LOGIN
function login(){
  let user = loginUser.value;
  let pass = loginPass.value;

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if(!users[user] || users[user].pass !== pass){
    alert("Error");
    return;
  }

  localStorage.setItem("current", user);

  show("dashboard");

  update();
}

// PLANES
function selectPlan(amount){
  let user = localStorage.getItem("current");
  let users = JSON.parse(localStorage.getItem("users"));

  users[user].plan = amount;
  users[user].balance = amount;
  users[user].last = Date.now();

  localStorage.setItem("users", JSON.stringify(users));

  alert("Plan activado");
}

// GANANCIAS
function earnings(user){
  let rates = {700:15,1000:29,1500:59};

  let now = Date.now();
  let diff = now - user.last;

  let days = Math.floor(diff / (1000*60*60*24));

  if(days > 0){
    user.balance += rates[user.plan]*days;
    user.last = now;
  }
}

// ACTUALIZAR
function update(){
  let user = localStorage.getItem("current");
  let users = JSON.parse(localStorage.getItem("users"));
  let data = users[user];

  earnings(data);

  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("user").innerText = user;
  document.getElementById("balance").innerText = data.balance;
  document.getElementById("plan").innerText = data.plan;
  document.getElementById("wallet").innerText = wallet;
}

// DEPOSITAR
function deposit(){
  let user = localStorage.getItem("current");
  let users = JSON.parse(localStorage.getItem("users"));

  users[user].balance += 500;

  localStorage.setItem("users", JSON.stringify(users));

  alert("Depósito simulado");
  update();
}

// RETIRAR
function withdraw(){
  let acc = document.getElementById("account").value;

  if(!acc){
    alert("Ingresa cuenta");
    return;
  }

  let user = localStorage.getItem("current");
  let users = JSON.parse(localStorage.getItem("users"));

  if(users[user].balance < 500){
    alert("Mínimo 500");
    return;
  }

  users[user].balance -= 500;

  localStorage.setItem("users", JSON.stringify(users));

  alert("Enviado 5-10 días");
  update();
}

// COPIAR
function copyWallet(){
  navigator.clipboard.writeText(wallet);
  alert("Copiado");
}
