export type ProvinciaState = {
  errors?: {
    descripcion?: string[];
  };
  message?: string | null;
};

export type ProvinciaForm = {
  id: number;
  descripcion: string;
  paisId: number;
};
