export interface ICotizacion {
    // Días
    diasBaja: number,
    diasAlta: number,
    diasTotales: number,
    
    // Totales
    totalBaja: number,
    totalAlta: number,
    totalIndividual: number,
    totalGrupo: number,

    // Fechas
    fechaDeInicio : string,
    fechaDeFin : string   
};