let balance = 0;
const wallet = "TB1vZrQ5RFKTsfZc3VeckfPxf4tS6pAhF5";

function login(){
  const user = document.getElementById('user').value;

  if(!user){
    alert("Ingresa usuario");
    return;
  }

  document.getElementById('auth').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';

  document.getElementById('username').innerText = user;
  document.getElementById('wallet').innerText = wallet;
}

function deposit(){
  balance += 500;
  update();
}

function withdraw(){
  if(balance < 500){
    alert("Mínimo retiro 500");
    return;
  }

  balance -= 500;
  alert("Fondos enviados. Espera de 5 a 10 días.");
  update();
}

function update(){
  document.getElementById('balance').innerText = balance;
}

function copyWallet(){
  navigator.clipboard.writeText(wallet);
  alert("Wallet copiada");
}
