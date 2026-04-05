let balance = 0;
const wallet = "TB1vZrQ5RFKTsfZc3VeckfPxf4tS6pAhF5";

function showSection(id){
  document.getElementById('auth').style.display = 'none';
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById(id).style.display = 'block';
}

function login(){
  showSection('dashboard');
  document.getElementById('wallet').innerText = wallet;

  // Mostrar popup
  setTimeout(()=>{
    document.getElementById('promoPopup').style.display = 'flex';
    startCountdown();
    randomStock();
  },1000);
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
  alert("Fondos enviados. Espera 5-10 días.");
  update();
}

function update(){
  document.getElementById('balance').innerText = balance;
}

function copyWallet(){
  navigator.clipboard.writeText(wallet);
  alert("Wallet copiada");
}

function closePopup(){
  document.getElementById('promoPopup').style.display = 'none';
}

function claim(){
  if(balance < 500){
    alert("Necesitas mínimo 500");
    return;
  }
  balance -= 500;
  alert("Pedido realizado. Llegará en 5-10 días.");
  update();
}

// ⏳ CONTADOR
function startCountdown(){
  let time = 300;
  setInterval(()=>{
    let m = Math.floor(time/60);
    let s = time%60;
    document.getElementById('countdown').innerText =
      m + ":" + (s<10?"0"+s:s);
    time--;
  },1000);
}

// 📉 STOCK
function randomStock(){
  let stock = 5;
  setInterval(()=>{
    if(stock > 1){
      stock--;
      document.getElementById('stock').innerText =
        "Quedan " + stock + " unidades";
    }
  },8000);
}
