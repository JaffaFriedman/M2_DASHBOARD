/* 27-12-2022 */
let dias=["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

function fhora(fecha,timezone){
    const rhora =new Date((fecha*1000 ))
    rhora.setHours(rhora.getHours()+timezone/3600+3);   
    return rhora.toString().substr(16,8);
}

function ffecha(fecha,timezone){
    const rfecha =new Date((fecha *1000))
    rfecha.setHours(rfecha.getHours()+timezone/3600+3);  
    return rfecha.toString().substr(0,15);}
 

function fdia(fecha,timezone){
    const rfecha =new Date((fecha *1000))
    rfecha.setHours(rfecha.getHours());  
    return dias[rfecha.getDay()];
}
    
  

export {ffecha,fhora,fdia};