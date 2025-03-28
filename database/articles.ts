const initialArticles: Omit<Article, 'id'>[] = [
  {
    title: 'O que é a LGPD?',
    summary: 'Lei Geral de Proteção de Dados Pessoais no Brasil',
    content: `A Lei Geral de Proteção de Dados (LGPD), Lei nº 13.709/2018, regulamentada pelo Decreto nº 10.474/2020, estabelece normas sobre tratamento de dados pessoais.

## Principais atualizações (2023):
- Nova regulamentação da ANPD sobre transferência internacional de dados (Resolução CD/ANPD nº 5)
- Inclusão de normas para startups pelo Marco Legal das Startups (Lei 14.460/2022)
- Julgamentos recentes do STJ sobre aplicação da LGPD

## Âmbito de aplicação:
A LGPD se aplica a:
1. Operações de tratamento realizadas no Brasil
2. Dados de pessoas localizadas no Brasil
3. Tratamento com finalidade de oferta ou fornecimento de bens/serviços`,
    category: 'Introdução',
    date: '10/01/2024',
    readingTime: '6 min',
    isFavorite: true,
    tags: JSON.stringify(['básico', 'conceitos'])
  },
  {
    title: 'Sanções da LGPD em 2024',
    summary: 'Valores atualizados e critérios de aplicação',
    content: `## Tabela de multas (atualizada em 2024):
- Infração leve: até R$ 50 mil por infração
- Infração grave: até R$ 50 milhões ou 2% do faturamento
- Infração gravíssima: até R$ 50 milhões ou 2% do faturamento

## Novos critérios da ANPD:
1. Gravidade da infração
2. Boa-fé do infrator
3. Adoção prévia de medidas de compliance
4. Efeitos econômicos da sanção

## Casos recentes:
- Primeira multa milionária aplicada em 2023: R$ 1,4 milhão
- Setores mais fiscalizados: varejo e saúde`,
    category: 'Sanções',
    date: '15/02/2024',
    readingTime: '7 min',
    isFavorite: false,
    tags: JSON.stringify(['multas', 'ANPD'])
  },
  {
    title: 'Direitos dos Titulares (2024)',
    summary: 'Lista completa dos direitos garantidos',
    content: `## Direitos previstos no Art. 18:
1. Confirmação da existência de tratamento
2. Acesso aos dados completos
3. Correção de dados incompletos
4. Anonimização ou eliminação
5. Portabilidade para outro fornecedor
6. Revogação do consentimento

## Novas orientações da ANPD:
- Prazo máximo para atendimento: 15 dias
- Formulários de requisição padronizados
- Canais obrigatórios para exercício de direitos

## Jurisprudência recente:
- STJ reconheceu direito ao esquecimento em caso de dados desatualizados`,
    category: 'Direitos',
    date: '05/03/2024',
    readingTime: '8 min',
    isFavorite: true,
    tags: JSON.stringify(['titulares', 'jurisprudência'])
  },
  {
    title: 'Dados Sensíveis - Tratamento',
    summary: 'Regras específicas para categorias especiais',
    content: `## Dados protegidos (Art. 11):
- Origem racial ou étnica
- Convicção religiosa
- Opinião política
- Dados genéticos ou biométricos
- Dados de saúde
- Vida sexual

## Novas resoluções (2024):
- Exigência de DPIA (Avaliação de Impacto) para tratamento
- Consentimento explícito por escrito
- Proibição de compartilhamento com terceiros sem autorização

## Caso prático:
- Recente condenação de laboratório por venda de dados de saúde`,
    category: 'Dados Sensíveis',
    date: '20/01/2024',
    readingTime: '6 min',
    isFavorite: false,
    tags: JSON.stringify(['saúde', 'biometria'])
  },
  {
    title: 'Transferência Internacional de Dados',
    summary: 'Novas regras da ANPD (Resolução nº 5/2023)',
    content: `## Requisitos para transferência:
1. Adequação do país destino
2. Garantias contratuais específicas
3. Cláusulas-padrão aprovadas pela ANPD
4. Certificação por organismo credenciado

## Países com nível adequado:
- União Europeia
- Reino Unido
- Argentina
- Uruguai

## Penalidades:
- Multa de até R$ 10 milhões por transferência irregular
- Suspensão imediata do fluxo de dados`,
    category: 'Internacional',
    date: '12/02/2024',
    readingTime: '5 min',
    isFavorite: true,
    tags: JSON.stringify(['transferência', 'ANPD'])
  },
  {
    title: 'As 10 Bases Legais da LGPD',
    summary: 'Quando o tratamento de dados é permitido sem consentimento',
    content: `## Bases legais previstas no Art. 7º:
1. Consentimento do titular
2. Cumprimento de obrigação legal
3. Execução de políticas públicas
4. Estudos por órgãos de pesquisa
5. Execução contratual
6. Processos judiciais
7. Proteção da vida
8. Tutela da saúde
9. Interesse legítimo
10. Proteção ao crédito

## Novas orientações da ANPD (2024):
- Documentação obrigatória da base legal utilizada
- Proibição de cambio de base legal sem notificação
- Ônus da prova cabe ao controlador`,
    category: 'Bases Legais',
    date: '18/03/2024',
    readingTime: '9 min',
    isFavorite: true,
    tags: JSON.stringify(['compliance', 'ANPD'])
  },
  {
    title: 'LGPD vs Marco Civil da Internet',
    summary: 'Como as leis se complementam na proteção digital',
    content: `## Pontos de intersecção:
- Armazenamento de registros (Art. 15)
- Responsabilidade de provedores
- Neutralidade da rede

## Diferenças cruciais:
| Marco Civil | LGPD |
|------------|------|
| Foco em infraestrutura | Foco em dados pessoais |
| Regula provedores | Regula todos os setores |

## Jurisprudência recente:
- STF reconheceu prevalência da LGPD em casos de dados pessoais`,
    category: 'Relação com Outras Leis',
    date: '22/02/2024',
    readingTime: '7 min',
    isFavorite: false,
    tags: JSON.stringify(['marco civil', 'internet'])
  },
  {
    title: 'Proteção de Dados de Menores',
    summary: 'Regras especiais do Art. 14 da LGPD',
    content: `## Requisitos para tratamento:
- Consentimento específico por pais/responsáveis
- Finalidade claramente definida
- Dados estritamente necessários

## Proibições absolutas:
- Tratamento sem finalidade educacional
- Compartilhamento com terceiros
- Uso para marketing direto

## Caso emblemático (2023):
- Multa de R$ 1.2 milhão em app infantil que coletava geolocalização`,
    category: 'Proteção Especial',
    date: '05/01/2024',
    readingTime: '6 min',
    isFavorite: true,
    tags: JSON.stringify(['menores', 'escola'])
  },
  {
    title: 'LGPD para PMEs',
    summary: 'Guia prático de implementação',
    content: `## Passos essenciais:
1. Mapeamento de dados (inventário)
2. Nomeação de encarregado (obrigatório desde 2023)
3. Política de privacidade simplificada
4. Registro de operações (ROPA)

## Benefícios para MEIs:
- Modelos gratuitos da ANPD
- Prazos estendidos para adequação
- Multas reduzidas em 60% (Resolução ANPD 02/2024)`,
    category: 'Para Empresas',
    date: '30/03/2024',
    readingTime: '8 min',
    isFavorite: false,
    tags: JSON.stringify(['pequenas empresas', 'guia'])
  },
  {
    title: 'Regras para Cookies na LGPD',
    summary: 'Conformidade em websites e apps',
    content: `## Novas diretrizes da ANPD:
- Banner deve ter:
  ✔ Opção "Rejeitar Todos"
  ✔ Configurações granulares
  ✔ Link para política detalhada

## Tipos de cookies:
| Necessários | Analíticos | Marketing |
|-------------|------------|-----------|
| Sem consentimento | Consentimento implícito | Consentimento explícito |

## Penalidades recentes:
- Site de e-commerce multado por cookies persistentes`,
    category: 'Tecnologia',
    date: '14/02/2024',
    readingTime: '5 min',
    isFavorite: true,
    tags: JSON.stringify(['cookies', 'marketing'])
  },
  {
    title: 'Como Exercer o Direito ao Esquecimento',
    summary: 'Limitações e procedimentos atualizados',
    content: `## Condições para requisição:
- Dados desatualizados
- Tratamento desproporcional
- Finalidade original concluída

## Exceções:
- Interesse histórico
- Pesquisa científica
- Segurança pública

## Caso relevante:
- STJ negou pedido contra portal de notícias (REsp 1.982.381)`,
    category: 'Direitos',
    date: '08/03/2024',
    readingTime: '6 min',
    isFavorite: false,
    tags: JSON.stringify(['esquecimento', 'jurisprudência'])
  },
  {
    title: 'Tratamento de Dados Médicos',
    summary: 'Especificidades do Art. 11º',
    content: `## Fluxo aprovado pela ANPD:
1. Coleta com termo específico
2. Criptografia obrigatória
3. Acesso restrito por função
4. Registro de acessos (log)

## Compartilhamento permitido:
- Entre profissionais da mesma equipe
- Para continuidade do tratamento
- Notificação compulsória (ex: doenças infecciosas)

## Novas resoluções:
- Prazo de retenção: 20 anos (Resolução CFM 2.324/2024)`,
    category: 'Setores Específicos',
    date: '25/01/2024',
    readingTime: '7 min',
    isFavorite: true,
    tags: JSON.stringify(['saúde', 'dados sensíveis'])
  },
  {
    title: 'Desafios da IA sob a LGPD',
    summary: 'Conformidade em sistemas automatizados',
    content: `## Requisitos para sistemas de IA:
- Transparência nas decisões automatizadas
- Direito à explicação (Art. 20)
- Avaliação de impacto obrigatória
- Auditoria periódica

## Casos problemáticos:
- Viés algorítmico em processos seletivos
- Perfilamento (profiling) sem consentimento

## Orientações ANPD:
- Guia para IA Responsável (publicado em jan/2024)`,
    category: 'Tecnologia',
    date: '19/03/2024',
    readingTime: '9 min',
    isFavorite: false,
    tags: JSON.stringify(['IA', 'algoritmos'])
  },
  {
    title: 'Processo Sancionatório da ANPD',
    summary: 'Etapas e defesa em casos de infração',
    content: `## Fluxo do processo:
1. Notificação preliminar
2. Defesa prévia (15 dias)
3. Relatório técnico
4. Julgamento (Diretoria ANPD)

## Estratégias de defesa:
- Comprovar adoção de medidas de compliance
- Apresentar reparação voluntária
- Demonstrar boa-fé

## Estatísticas 2023:
- 78% dos casos encerrados com advertência
- Tempo médio: 8 meses`,
    category: 'Sanções',
    date: '11/02/2024',
    readingTime: '8 min',
    isFavorite: true,
    tags: JSON.stringify(['processo', 'defesa'])
  },
  {
    title: 'Cláusulas Contratuais para Transferência',
    summary: 'Modelos aprovados pela ANPD',
    content: `## Elementos obrigatórios:
- Finalidade específica
- Medidas de segurança
- Direitos dos titulares
- Responsabilidades

## Novos modelos (2024):
1. Cláusulas Padrão (Resolução 5/2023)
2. Certificação ANPD
3. Selos de adequação

## Países com restrição:
- China
- Rússia
- Venezuela`,
    category: 'Internacional',
    date: '28/02/2024',
    readingTime: '6 min',
    isFavorite: false,
    tags: JSON.stringify(['contratos', 'compliance'])
  }
];

export default initialArticles;