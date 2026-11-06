// Valores idénticos a los enums de backend/src. Si el backend cambia, actualizar acá.

export enum Rol {
  ENTRENADOR = 'ENTRENADOR',
  BOXEADOR = 'BOXEADOR',
}

export enum Sexo {
  MASCULINO = 'MASCULINO',
  FEMENINO = 'FEMENINO',
}

export enum Gravedad {
  LEVE = 'LEVE',
  MODERADA = 'MODERADA',
  GRAVE = 'GRAVE',
}

export enum EstadoLesion {
  ACTIVA = 'ACTIVA',
  RECUPERADA = 'RECUPERADA',
}

export enum EstadoSugerencia {
  PENDIENTE = 'PENDIENTE',
  TOMADA_EN_CUENTA = 'TOMADA_EN_CUENTA',
  NO_TOMADA_EN_CUENTA = 'NO_TOMADA_EN_CUENTA',
}

export enum TipoEntrenamiento {
  RUTINARIO = 'RUTINARIO',
  PRE_PELEA = 'PRE_PELEA',
  POST_PELEA = 'POST_PELEA',
}

export enum CategoriaPeso {
  MINIMO = 'MINIMO',
  LIGHT_FLYWEIGHT = 'LIGHT_FLYWEIGHT',
  MOSCA = 'MOSCA',
  SUPERMOSCA = 'SUPERMOSCA',
  GALLO = 'GALLO',
  SUPERGALLO = 'SUPERGALLO',
  PLUMA = 'PLUMA',
  SUPERPLUMA = 'SUPERPLUMA',
  LIGERO = 'LIGERO',
  SUPERLIGERO = 'SUPERLIGERO',
  WELTER = 'WELTER',
  SUPERWELTER = 'SUPERWELTER',
  MEDIANO = 'MEDIANO',
  SUPERMEDIANO = 'SUPERMEDIANO',
  SEMIPESADO = 'SEMIPESADO',
  CRUCERO = 'CRUCERO',
  PESADO = 'PESADO',
}
