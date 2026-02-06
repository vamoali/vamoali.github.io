export type Hotel = {
  id: string;
  name: string;
  city: string;
  price: number;
  rating: number;
  tags: string[];
  description: string;
};

export const HOTELS: Hotel[] = [
  {
    id: "1",
    name: "Hotel Vista Mar",
    city: "Rio de Janeiro",
    price: 420,
    rating: 4.8,
    tags: ["Vista para o mar", "Cancelamento grátis"],
    description:
      "Vista para o mar, quartos amplos e café da manhã completo. Ideal para viagens em família."
  },
  {
    id: "2",
    name: "Loft Centro Histórico",
    city: "Salvador",
    price: 280,
    rating: 4.7,
    tags: ["Self check-in", "Wi-Fi rápido"],
    description:
      "Loft moderno com localização central, perfeito para explorar a cidade a pé."
  },
  {
    id: "3",
    name: "Resort Natureza",
    city: "Foz do Iguaçu",
    price: 610,
    rating: 4.9,
    tags: ["All inclusive", "Piscinas termais"],
    description:
      "Resort completo com natureza exuberante, piscinas termais e experiências exclusivas."
  },
  {
    id: "4",
    name: "Apartamento Jardim",
    city: "São Paulo",
    price: 330,
    rating: 4.6,
    tags: ["Pet friendly", "Academia"],
    description: "Apartamento moderno com área verde e ótima localização."
  },
  {
    id: "5",
    name: "Pousada do Sol",
    city: "Florianópolis",
    price: 260,
    rating: 4.5,
    tags: ["Praia próxima", "Café da manhã"],
    description: "Clima acolhedor e café da manhã artesanal."
  },
  {
    id: "6",
    name: "Boutique Elegance",
    city: "Curitiba",
    price: 390,
    rating: 4.7,
    tags: ["Design moderno", "Spa"],
    description: "Design contemporâneo com experiências relaxantes."
  },
  {
    id: "7",
    name: "Hotel Horizonte",
    city: "Fortaleza",
    price: 310,
    rating: 4.4,
    tags: ["Vista urbana", "Piscina"],
    description: "Conforto urbano com vista panorâmica."
  },
  {
    id: "8",
    name: "Casa Serena",
    city: "Gramado",
    price: 520,
    rating: 4.8,
    tags: ["Lareira", "Café colonial"],
    description: "Refúgio charmoso nas montanhas."
  },
  {
    id: "9",
    name: "Eco Lodge Verde",
    city: "Chapada dos Veadeiros",
    price: 450,
    rating: 4.9,
    tags: ["Natureza", "Trilhas guiadas"],
    description: "Experiência sustentável em meio à natureza."
  },
  {
    id: "10",
    name: "Hotel Atlântico",
    city: "Natal",
    price: 295,
    rating: 4.3,
    tags: ["Beira-mar", "Restaurante"],
    description: "Conforto frente ao mar com gastronomia local."
  },
  {
    id: "11",
    name: "Skyline Suites",
    city: "Belo Horizonte",
    price: 340,
    rating: 4.6,
    tags: ["Rooftop", "Coworking"],
    description: "Estilo urbano com espaços para trabalhar."
  },
  {
    id: "12",
    name: "Refúgio da Serra",
    city: "Campos do Jordão",
    price: 575,
    rating: 4.8,
    tags: ["Vista da serra", "Hidromassagem"],
    description: "Vista deslumbrante e clima aconchegante."
  }
];
