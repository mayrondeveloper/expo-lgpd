export const getCategoryColor = (name: string) => {
  switch(name) {
    case 'Introdução':
      return {
        icon: 'star',
        iconColor: '#f6ad55', // Amêndoa
        bgColor: '#fffaf0',   // Fundo claro
        textColor: '#dd6b20'  // Texto escuro
      };
    case 'Direitos':
      return {
        icon: 'gavel',
        iconColor: '#68d391', // Verde menta
        bgColor: '#f0fff4',
        textColor: '#38a169'
      };
    case 'Obrigações':
      return {
        icon: 'shield',
        iconColor: '#63b3ed', // Azul céu
        bgColor: '#ebf8ff',
        textColor: '#3182ce'
      };
    case 'Sanções':
      return {
        icon: 'warning',
        iconColor: '#fc8181', // Vermelho claro
        bgColor: '#fff5f5',
        textColor: '#e53e3e'
      };
    case 'Jurisprudência':
      return {
        icon: 'bookmarks',
        iconColor: '#9f7aea', // Roxo
        bgColor: '#faf5ff',
        textColor: '#805ad5'
      };
    default:
      return {
        icon: 'folder',
        iconColor: '#a0aec0', // Cinza
        bgColor: '#edf2f7',
        textColor: '#4a5568'
      };
  }
};