
let menuToggle = document.querySelector('.menu-toggle');
let menuToggleIcon = document.querySelector('.menu-toggle i');
let menu = document.getElementById('menu');

menuToggle.addEventListener('click', e=>{
    menu.classList.toggle('show');

    if(menu.classList.contains('show')){
        menuToggleIcon.setAttribute('class', 'fa fa-times');
    }else{
        menuToggleIcon.setAttribute('class', 'fa fa-bars');
    }
});


//  let slider = document.querySelector(".slider-contenedor")
//  let sliderIndividual = document.querySelectorAll(".contenido-slider")
//  let contador = 1;
//  let width = sliderIndividual[0].clientWidth;
//  let intervalo = 3000;

//  window.addEventListener("resize", function(){
//      width = sliderIndividual[0].clientWidth;
//  })

//  setInterval(function(){
//      slides();
//  },intervalo);


//  function slides(){
//      slider.style.transform = "translate("+(-width*contador)+"px)";
//      slider.style.transition = "transform .8s";
//      contador++;

//     if(contador == sliderIndividual.length){
//         setTimeout(function(){
//              slider.style.transform = "translate(0px)";
//              slider.style.transition = "transform 0s";
//              contador=1;
//          },1500)
//      }
//  }
