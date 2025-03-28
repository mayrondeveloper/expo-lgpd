export const getCategoryColor = (name: string) => {
  switch(name) {
    case 'Introdução':
      return {
        icon: 'info',
        iconColor: '#3182ce', // Azul institucional
        bgColor: '#ebf8ff',
        textColor: '#2c5282'
      };
    case 'Direitos':
      return {
        icon: 'account-balance',
        iconColor: '#38a169', // Verde sóbrio
        bgColor: '#f0fff4',
        textColor: '#276749'
      };
    case 'Sanções':
      return {
        icon: 'gavel',
        iconColor: '#e53e3e', // Vermelho
        bgColor: '#fff5f5',
        textColor: '#c53030'
      };
    case 'Internacional':
      return {
        icon: 'public',
        iconColor: '#00a3c4', // Azul turquesa
        bgColor: '#ebf8ff',
        textColor: '#0987a0'
      };
    case 'Tecnologia':
      return {
        icon: 'code',
        iconColor: '#805ad5', // Roxo
        bgColor: '#faf5ff',
        textColor: '#6b46c1'
      };
    case 'Setores Específicos':
      return {
        icon: 'domain',
        iconColor: '#d69e2e', // Âmbar
        bgColor: '#fffaf0',
        textColor: '#b7791f'
      };
    case 'Relação com Outras Leis':
      return {
        icon: 'library-books',
        iconColor: '#0987a0', // Azul petróleo
        bgColor: '#e6fffa',
        textColor: '#285e61'
      };
    case 'Proteção Especial':
      return {
        icon: 'security',
        iconColor: '#d53f8c', // Rosa
        bgColor: '#fff5f7',
        textColor: '#97266d'
      };
    case 'Para Empresas':
      return {
        icon: 'business',
        iconColor: '#667eea', // Azul índigo
        bgColor: '#ebf4ff',
        textColor: '#5a67d8'
      };
    case 'Dados Sensíveis':
      return {
        icon: 'enhanced-encryption',
        iconColor: '#dd6b20', // Laranja
        bgColor: '#fffaf0',
        textColor: '#c05621'
      };
    case 'Bases Legais':
      return {
        icon: 'article',
        iconColor: '#4a5568', // Cinza azulado
        bgColor: '#edf2f7',
        textColor: '#2d3748'
      };
    default:
      return {
        icon: 'folder',
        iconColor: '#718096',
        bgColor: '#edf2f7',
        textColor: '#4a5568'
      };
  }
};

export const getCategoryIcon = (name: string): keyof typeof MaterialIcons.glyphMap => {
         switch(name) {
           case 'Introdução':
             return 'info'; // Ícone para informações introdutórias
           case 'Direitos':
             return 'account-balance'; // Balança da justiça
           case 'Sanções':
             return 'gavel'; // Representando penalidades
           case 'Internacional':
             return 'public'; // Para temas internacionais
           case 'Tecnologia':
             return 'code'; // Para aspectos tecnológicos
           case 'Setores Específicos':
             return 'domain'; // Para setores específicos
           case 'Relação com Outras Leis':
             return 'library-books'; // Para relações legais
           case 'Proteção Especial':
             return 'security'; // Para proteções especiais
           case 'Para Empresas':
             return 'business'; // Para orientações empresariais
           case 'Dados Sensíveis':
             return 'enhanced-encryption'; // Para dados sensíveis
           case 'Bases Legais':
             return 'article'; // Para fundamentos legais
           default:
             return 'folder'; // Padrão
         }
       };

   export const getCategoryColorForCard = (category: string) => {
     const colors = {
       'Introdução': {
         bgColor: '#ebf8ff',  // Azul claro
         textColor: '#2c5282' // Azul escuro
       },
       'Direitos': {
         bgColor: '#f0fff4',  // Verde claro
         textColor: '#276749' // Verde escuro
       },
       'Sanções': {
         bgColor: '#fff5f5',  // Vermelho claro
         textColor: '#c53030' // Vermelho escuro
       },
       'Internacional': {
         bgColor: '#ebf8ff',  // Azul claro
         textColor: '#0987a0' // Azul turquesa
       },
       'Tecnologia': {
         bgColor: '#faf5ff',  // Roxo claro
         textColor: '#6b46c1' // Roxo médio
       },
       'Setores Específicos': {
         bgColor: '#fffaf0',  // Âmbar claro
         textColor: '#b7791f' // Âmbar escuro
       },
       'Relação com Outras Leis': {
         bgColor: '#e6fffa',  // Azul petróleo claro
         textColor: '#285e61' // Azul petróleo escuro
       },
       'Proteção Especial': {
         bgColor: '#fff5f7',  // Rosa claro
         textColor: '#97266d' // Rosa escuro
       },
       'Para Empresas': {
         bgColor: '#ebf4ff',  // Azul índigo claro
         textColor: '#5a67d8' // Azul índigo
       },
       'Dados Sensíveis': {
         bgColor: '#fffaf0',  // Laranja claro
         textColor: '#c05621' // Laranja escuro
       },
       'Bases Legais': {
         bgColor: '#edf2f7',  // Cinza azulado claro
         textColor: '#2d3748' // Cinza azulado escuro
       },
       'default': {
         bgColor: '#edf2f7',  // Cinza azulado claro
         textColor: '#4a5568' // Cinza azulado médio
       }
     };

     return colors[category] || colors['default'];
   };