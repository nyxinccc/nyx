// Función para mostrar secciones al hacer clic en el menú
function showSection(id){
  const sections = ['plansSection','dashboard','news','faq'];
  sections.forEach(sec => {
    document.getElementById(sec).style.display = (sec===id) ? 'block' : 'none';
  });
}
