// app/data/articles.ts
export interface Article {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  date: string;
  readingTime: string;
  isFavorite: boolean;
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: 'O que é a LGPD?',
    summary: 'Lei Geral de Proteção de Dados Pessoais no Brasil',
    content: `A LGPD (Lei nº 13.709/2018) estabelece normas sobre tratamento de dados pessoais...`,
    category: 'Introdução',
    date: '15/05/2023',
    readingTime: '5 min',
    isFavorite: true
  },
  {
    id: 2,
    title: 'Direitos dos Titulares',
    summary: 'Conheça os 10 direitos garantidos pela LGPD',
    content: `1. Acesso aos dados\n2. Correção de dados incompletos...`,
    category: 'Direitos',
    date: '22/05/2023',
    readingTime: '7 min',
    isFavorite: false
  },
  {
    id: 3,
    title: 'Sanções Administrativas',
    summary: 'Multas e penalidades por descumprimento da lei',
    content: `As sanções podem chegar a 2% do faturamento...`,
    category: 'Sanções',
    date: '30/05/2023',
    readingTime: '6 min',
    isFavorite: true
  }
];

export default mockArticles;