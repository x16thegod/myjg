export interface Article {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  breaking?: boolean;
}

export const categories = [
  "Notícias",
  "Eventos",
  "Esportes",
  "Vida Estudantil",
  "Cultura",
  "Projetos",
  "Opiniões",
  "Entrevistas",
  "Avisos",
  "Programação",
];

export const articles: Article[] = [
  {
    id: "1",
    title: "Alunos do Glicério Conquistam Primeiro Lugar na Olimpíada Regional de Robótica",
    excerpt: "Equipe formada por estudantes do ensino médio desenvolveu robô autônomo que superou 32 escolas da região metropolitana do Recife.",
    body: `A equipe de robótica da Escola José Glicério conquistou o primeiro lugar na Olimpíada Regional de Robótica, realizada no último sábado no Centro de Convenções de Pernambuco. O grupo, formado por cinco estudantes do ensino médio, desenvolveu um robô autônomo capaz de navegar por um labirinto complexo e realizar tarefas de resgate simulado.

O projeto, batizado de "Glicério Bot", foi desenvolvido ao longo de seis meses sob a orientação do professor de física Carlos Eduardo Santos. "Os alunos demonstraram uma dedicação extraordinária. Eles trabalharam nos fins de semana e durante o recesso para aperfeiçoar o protótipo", destacou o professor.

A competição reuniu 32 escolas da região metropolitana do Recife, e a equipe do Glicério se destacou tanto na parte técnica quanto na apresentação do projeto ao júri. "Foi emocionante ver nosso robô completando todas as tarefas sem falhas. Meses de trabalho duro valeram a pena", celebrou Maria Clara, 16 anos, capitã da equipe.

A conquista garante à equipe uma vaga na etapa nacional, que será realizada em São Paulo no próximo mês. A escola já iniciou uma campanha de arrecadação para custear a viagem dos estudantes.

"Este resultado mostra que nossos alunos podem competir com qualquer escola do país. Estamos muito orgulhosos e vamos apoiar a equipe em todas as etapas", afirmou a diretora Ana Beatriz Ferreira.`,
    category: "Notícias",
    author: "Ana Silva",
    date: "14 Mar 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=800&fit=crop",
    featured: true,
  },
  {
    id: "2",
    title: "Festival de Cultura Nordestina Movimenta a Escola com Três Dias de Programação",
    excerpt: "Evento celebra a diversidade cultural de Pernambuco com apresentações de maracatu, frevo e cordel.",
    body: "O Festival de Cultura Nordestina da Escola José Glicério acontecerá entre os dias 20 e 22 de março, com uma programação rica que inclui apresentações de maracatu, oficinas de xilogravura, rodas de cordel e muito frevo. O evento é organizado pelos próprios alunos com apoio dos professores de arte e história.",
    category: "Eventos",
    author: "Pedro Henrique",
    date: "13 Mar 2026",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",
  },
  {
    id: "3",
    title: "Time de Futsal Feminino Avança para as Semifinais dos Jogos Estudantis",
    excerpt: "Com campanha invicta, as atletas do Glicério enfrentarão o Colégio São José na próxima fase.",
    body: "O time de futsal feminino da Escola José Glicério garantiu vaga nas semifinais dos Jogos Estudantis de Pernambuco após uma campanha invicta na fase de grupos. A equipe venceu todas as quatro partidas e agora se prepara para enfrentar o Colégio São José.",
    category: "Esportes",
    author: "Lucas Oliveira",
    date: "12 Mar 2026",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop",
  },
  {
    id: "4",
    title: "Novo Laboratório de Ciências Amplia Possibilidades de Pesquisa Estudantil",
    excerpt: "Espaço renovado conta com equipamentos modernos e permite experimentos mais avançados para todas as séries.",
    body: "A Escola José Glicério inaugurou seu novo laboratório de ciências, equipado com microscópios digitais, estação meteorológica e kits de química avançada. O investimento de R$ 150 mil foi possível graças a uma parceria com a Universidade Federal de Pernambuco.",
    category: "Projetos",
    author: "Isabela Costa",
    date: "11 Mar 2026",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop",
  },
  {
    id: "5",
    title: "Editorial: Por Que Precisamos Falar Sobre Saúde Mental na Escola",
    excerpt: "A pressão acadêmica e as redes sociais estão afetando o bem-estar dos estudantes. É hora de agir.",
    body: "A cada semestre, mais alunos relatam sintomas de ansiedade e estresse relacionados à vida escolar. Como comunidade, precisamos criar espaços seguros de diálogo e apoio emocional. Este editorial propõe três ações concretas que nossa escola pode adotar imediatamente.",
    category: "Opiniões",
    author: "Mariana Alves",
    date: "10 Mar 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=600&fit=crop",
  },
  {
    id: "6",
    title: "Entrevista: Professor Carlos Conta Como Transformou Física em Paixão dos Alunos",
    excerpt: "Com métodos criativos e experimentos práticos, o educador conquistou uma das maiores taxas de aprovação da escola.",
    body: "Em entrevista exclusiva ao Jornal Glicério, o professor Carlos Eduardo Santos revela como transformou suas aulas de física em uma das disciplinas mais populares da escola, usando experimentos práticos, gamificação e projetos interdisciplinares.",
    category: "Entrevistas",
    author: "Fernanda Lima",
    date: "9 Mar 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop",
  },
  {
    id: "7",
    title: "Grêmio Estudantil Lança Campanha de Arrecadação de Livros para Biblioteca Comunitária",
    excerpt: "Meta é arrecadar mil livros até o final do semestre para criar acervo acessível à comunidade do bairro.",
    body: "O Grêmio Estudantil da Escola José Glicério lançou a campanha 'Um Livro, Uma História', com a meta de arrecadar mil livros até o final do semestre. Os livros serão destinados a uma biblioteca comunitária que será inaugurada no bairro.",
    category: "Vida Estudantil",
    author: "Thiago Santos",
    date: "8 Mar 2026",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
  },
  {
    id: "8",
    title: "Grupo de Teatro Apresenta Adaptação de 'Auto da Compadecida' no Auditório",
    excerpt: "Montagem dirigida por alunos do terceiro ano reinterpreta clássico de Ariano Suassuna com temas atuais.",
    body: "O grupo de teatro da Escola José Glicério apresentará sua adaptação do 'Auto da Compadecida', de Ariano Suassuna, nos dias 25 e 26 de março. A montagem, dirigida por alunos do terceiro ano, traz releituras contemporâneas dos personagens clássicos.",
    category: "Cultura",
    author: "Camila Rodrigues",
    date: "7 Mar 2026",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&h=600&fit=crop",
  },
  {
    id: "9",
    title: "Inscrições Abertas para a Feira de Ciências 2026: Tema é Sustentabilidade",
    excerpt: "Alunos de todas as séries podem inscrever projetos até 30 de março. Melhores trabalhos serão apresentados na UFPE.",
    body: "A Feira de Ciências 2026 da Escola José Glicério já está com inscrições abertas. Este ano, o tema é 'Sustentabilidade e o Futuro que Queremos'. Os melhores projetos serão selecionados para apresentação na Universidade Federal de Pernambuco.",
    category: "Avisos",
    author: "Redação",
    date: "6 Mar 2026",
    readTime: "2 min",
    image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&h=600&fit=crop",
    breaking: true,
  },
  {
    id: "10",
    title: "Aluna do Glicério É Selecionada para Programa de Intercâmbio nos Estados Unidos",
    excerpt: "Beatriz Souza, do segundo ano, vai estudar por um semestre em escola parceira na Califórnia.",
    body: "Beatriz Souza, aluna do segundo ano do ensino médio, foi selecionada para o programa de intercâmbio estudantil entre a Escola José Glicério e a Lincoln High School, na Califórnia. Ela embarca em agosto para uma experiência de um semestre.",
    category: "Notícias",
    author: "Ana Silva",
    date: "5 Mar 2026",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&h=600&fit=crop",
  },
  {
    id: "11",
    title: "Introdução ao Python: Sua Primeira Linguagem de Programação",
    excerpt: "Aprenda os fundamentos do Python, a linguagem mais popular do mundo, com exemplos práticos e projetos simples para iniciantes.",
    body: "Python é a linguagem perfeita para quem está começando a programar. Neste artigo, vamos explorar variáveis, loops, condicionais e funções com exemplos do dia a dia. Ao final, você terá criado seu primeiro programa funcional.",
    category: "Programação",
    author: "Pedro Henrique",
    date: "14 Mar 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
  },
  {
    id: "12",
    title: "Cibersegurança para Iniciantes: Como Proteger Seus Dados Online",
    excerpt: "Descubra as principais ameaças digitais e aprenda técnicas essenciais para manter seus dados seguros na internet.",
    body: "A cibersegurança nunca foi tão importante. Neste guia, vamos abordar phishing, engenharia social, senhas seguras, autenticação de dois fatores e as melhores práticas para navegar com segurança. Conhecimento essencial para qualquer estudante.",
    category: "Programação",
    author: "Pedro Henrique",
    date: "12 Mar 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
  },
];

export const getArticlesByCategory = (category: string) =>
  articles.filter((a) => a.category === category);

export const getFeaturedArticle = () =>
  articles.find((a) => a.featured) || articles[0];

export const getArticleById = (id: string) =>
  articles.find((a) => a.id === id);
