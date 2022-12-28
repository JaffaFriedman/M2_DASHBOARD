/* JFE 17-12-2022 */
let weatherD=["cielo claro",            //0
              "nevada ligera",          //1
              "algo de nubes",          //2
              "nubes",                  //3
              "muy nuboso",             //4
              "lluvia ligera",          //5
              "lluvia moderada",        //6
              "lluvia de gran intensidad",//7
              "nubes dispersas",        //8
              "humo"]; //9
let weatherM=["Clear", //0
            "Clouds",  //1
            "Rain",    //2
            "Snow",   //3
            "Smoke"];  //4

function imagenClima (descripcion,main,sunrise,sunset,horaAct){
    let carpeta="dia";
    if (horaAct < sunrise ) carpeta="noche";
    if (horaAct > sunset ) carpeta="noche";
    let img = 'D_'+weatherD.findIndex(weather => weather === descripcion);
    if (img==='D_-1') img = 'M_'+weatherM.findIndex(weather => weather === main);
    return "./img/"+carpeta+"/weather"+img+".png";
}


function imagenViento (grados){
    let indice=Math.round(grados/45);
    return "./img/vientos/viento_"+indice+".png";
}


function imagenTermometro (temp){
    let colorTerm='amarillo';
    if ( temp <18) colorTerm='azul';
    if ( temp >28) colorTerm='rojo';
    return  "./img/term_"+colorTerm+".png" ;
}

export {imagenClima,imagenTermometro,imagenViento};