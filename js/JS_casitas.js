window.addEventListener("load", dibujaMalla);

const GRIS_CLARO = "lightgrey";
const ALTO_CANVAS = 300;
const ANCHO_CANVAS = 1500;
const CUADRADOS_MALLA=50;
const UNIDAD_MALLA=30;
const LARGO_CERILLA=80; //sin la cabeza 
const ANCHO_CERILLA=5;

let ctx;
let a=UNIDAD_MALLA*3;
let i;

//dibujamos la malla en el canvas nos ayudará a la distribución de las cerillas. 
function dibujaMalla() {
    ctx = document.getElementById("lienzo").getContext("2d");
    ctx.beginPath();
    //líneas verticales
    for (i = 1; i < CUADRADOS_MALLA; i++) {
        ctx.moveTo(i * UNIDAD_MALLA, 0);
        ctx.lineTo(i * UNIDAD_MALLA, ALTO_CANVAS);
    }
    //líneas horizontales
    for (i = 1; i < CUADRADOS_MALLA; i++){
        ctx.moveTo(0, i * UNIDAD_MALLA);
        ctx.lineTo(ANCHO_CANVAS, i * UNIDAD_MALLA);
    }
    ctx.strokeStyle = GRIS_CLARO;
    ctx.stroke();
    ctx.closePath();
}

//función principal. Dibuja casitas en función del número de casitas introducido
function dibujaCasitaCerillas(){
    let numCasitas=document.getElementById("input_casitas").value;
    let btn = document.getElementById('btnResolver');
    let n=0;
    let m=0;
    let u=3*UNIDAD_MALLA;      
    for(i=0; i<numCasitas;i++){ //bucle for para repetir las casitas
        n=i*u;
        m=u;
        dibujaCerilla3(n);
        dibujaCerilla4(n);
        dibujaCerilla2(n);
        dibujaCerilla1(n);
        dibujaCerilla5(n);
        dibujaCerilla6(n);
    }
    calculoCerillas(numCasitas); //invocamos el método calculo cerillas para obtener el n1 de cerillas cada vez
    btn.disabled= true; //deshabilitamos el botón "hacer casitas para que no se vuelva a poder pulsar si no se limpia el canvas
}

//Dibujamos las cerillas por separado
//cerilla vertical izquierda
function dibujaCerilla1(n){
    let canvas = document.getElementById('lienzo');
    let cerilla = canvas.getContext('2d');
    cerilla.fillStyle = "khaki";
    cerilla.beginPath();
    cerilla.fillRect(57.5+n,240,ANCHO_CERILLA,-LARGO_CERILLA);
    cerilla.closePath();  
    cerilla.fill();
    cerilla.fillStyle="tomato";
    dibujaCabezaCerilla(ctx,n+56,150, 8, 14, 1);   
}

//cerilla vertical derecha
function dibujaCerilla2(n){
    let canvas = document.getElementById('lienzo');
    if (canvas.getContext){
      let cerilla = canvas.getContext('2d');
      cerilla.fillStyle = "khaki";
      cerilla.beginPath();
      cerilla.fillRect(n+57.5+(3*UNIDAD_MALLA),240,ANCHO_CERILLA,-LARGO_CERILLA);
      cerilla.closePath();
      cerilla.fill();
      cerilla.fillStyle="tomato";
      dibujaCabezaCerilla(ctx,n+146,150, 8, 14, 1);
    }
}
//cerilla horizontal arriba
function dibujaCerilla3(n){
    let canvas = document.getElementById('lienzo');
    if (canvas.getContext){
      let cerilla = canvas.getContext('2d');
      cerilla.fillStyle = "khaki";
      cerilla.beginPath();
      cerilla.fillRect(n+60,240,LARGO_CERILLA,ANCHO_CERILLA);
      cerilla.closePath();
      cerilla.fill();
      cerilla.fillStyle="tomato";
      dibujaCabezaCerilla(ctx,n+136,237.5, 14, 8, 1);
    }
}
//cerilla horizontal debajo
function dibujaCerilla4(n){
    let canvas = document.getElementById('lienzo');
    if (canvas.getContext){
      let cerilla = canvas.getContext('2d');
      cerilla.save();
      cerilla.fillStyle = "khaki";
      cerilla.beginPath();
      cerilla.fillRect(n+60,150,LARGO_CERILLA,ANCHO_CERILLA);
      cerilla.closePath();
      cerilla.fill();
      cerilla.fillStyle="tomato";
      dibujaCabezaCerilla(ctx,n+136,147.5, 14, 8, 1);
      
    }
}

//uso de método save() y restore() para cerrar en un bloque el código y que no influya a las demás sentencias
//lo uso en las dos cerillas con rotadas

//cerilla "tejado" izquierda
function dibujaCerilla5(n){
    let canvas = document.getElementById('lienzo');
    let cerilla = canvas.getContext('2d');
    //base cerilla
    cerilla.save();
    cerilla.translate(60+n,150); //cambio el sistema de coordenadas del canvas para la traslación local de la cerilla izq
    cerilla.fillStyle = "khaki";
    cerilla.rotate(30 * Math.PI / 180);
    cerilla.beginPath();
    cerilla.fillRect(0,0,ANCHO_CERILLA,-LARGO_CERILLA);
    cerilla.closePath();
    cerilla.fill();
    cerilla.restore();
    //cabella cerilla
    cerilla.save();
    cerilla.translate(105+n,70); //idem cambio de coordenadas para fósforo izquierdo
    cerilla.fillStyle="tomato";
    cerilla.rotate(30 * Math.PI / 180);
    cerilla.beginPath();
    dibujaCabezaCerilla(ctx,0,0, 8, 14, 1); 
    cerilla.closePath();
    cerilla.fill();
    cerilla.restore();
}

//cerilla "tejado" izquierda
function dibujaCerilla6(n){
    let canvas = document.getElementById('lienzo');
    let cerilla = canvas.getContext('2d');
    //base cerilla
    cerilla.save(); 
    cerilla.translate(147.5+n,150); //ídem cerilla anterior en su posición de base
    cerilla.fillStyle = "khaki";
    cerilla.rotate(-30 * Math.PI / 180);
    cerilla.beginPath();
    cerilla.fillRect(0,0,ANCHO_CERILLA,-LARGO_CERILLA);
    cerilla.closePath();
    cerilla.fill();
    cerilla.restore();
    //cabeza de cerilla
    cerilla.save();
    cerilla.translate(102.5+n,75);
    cerilla.fillStyle="tomato";
    cerilla.rotate(-30 * Math.PI / 180);
    cerilla.beginPath();
    dibujaCabezaCerilla(ctx,0,0, 8, 14, 1); 
    cerilla.closePath();
    cerilla.fill();
    cerilla.restore();
}

function dibujaCabezaCerilla(ctx, x, y, w, h, lw) {
    let k=0.5
    let ox = (w / 2) * k; // desplasamiento horizontal (offset)
    let oy = (h / 2) * k; // desplazamiento vertical (offset)
    let xf = x + w;           // x final
    let yf = y + h;           // y final
    let xm = x + w / 2;       // x medio
    let ym = y + h / 2;       // y medio

    ctx.beginPath();           
    ctx.lineWidth = lw;
    ctx.strokeStyle = "tomato";
    ctx.fillStyle = "tomato";

    ctx.moveTo( x, ym );
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y );
    ctx.bezierCurveTo(xm + ox, y, xf, ym - oy, xf, ym );
    ctx.bezierCurveTo(xf, ym + oy, xm + ox, yf, xm, yf );
    ctx.bezierCurveTo(xm - ox, yf, x, ym + oy, x, ym );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

function calculoCerillas(numCasitas){
    let numCerillas; 
    if(numCasitas==0){
        numCerillas=0;
    } 
    if(numCasitas>=1){
        numCerillas= (numCasitas*6)-(numCasitas-1);
        document.getElementById("cerillasTotales").innerHTML = numCerillas;
    }
}

function limpiar(){
    let btn = document.getElementById('btnResolver');
    document.getElementById("cerillasTotales").innerHTML = "";
    document.getElementById("input_casitas").value = "1"; //Valor de casitas por defecto
    let canvas = document.getElementById('lienzo');
    lienzo = canvas.getContext('2d');
    lienzo.clearRect(0,0,ANCHO_CANVAS, ALTO_CANVAS);
    dibujaMalla();
    btn.disabled=false;
}