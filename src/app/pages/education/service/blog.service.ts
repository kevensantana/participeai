import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { BlogPost, Category, Author, BlogFilters, PaginatedResponse } from '../models/blog-post.model';
// Add BlogStats interface definition
export interface BlogStats {
  totalPosts: number;
  totalCategories: number;
  totalViews: number;
  totalComments: number;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private postsSubject = new BehaviorSubject<BlogPost[]>([]);
  public posts$ = this.postsSubject.asObservable();

  private categories: Category[] = [
    {
      name: 'Desperdício de Alimentos',
      slug: 'food-waste',
      color: '#4CAF50',
      icon: '🌿',
      id: ''
    },
    {
      name: 'Gestão de Resíduos',
      slug: 'waste-disposal',
      color: '#8A6240',
      icon: '🗑️',
      id: ''
    },
    {
      name: 'Conservação da Água',
      slug: 'water-consumption',
      color: '#00796B',
      icon: '💧',
      id: ''
    },
    {
      name: 'Eficiência Energética',
      slug: 'energy-consumption',
      color: '#AAA713',
      icon: '⚡',
      id: ''
    }
  ];


  private mockAuthors: Author[] = [
    {
      id: '1',
      name: 'Dr. Maria Silva',
      email: 'maria@example.com',
      avatar: '/placeholder.svg?height=40&width=40',
      bio: 'Especialista em sustentabilidade ambiental com mais de 15 anos de experiência.',
      role: 'Pesquisadora Sênior'
    },
    {
      id: '2',
      name: 'João Santos',
      email: 'joao@example.com',
      avatar: '/placeholder.svg?height=40&width=40',
      bio: 'Engenheiro ambiental e consultor em energia renovável.',
      role: 'Consultor Ambiental'
    },
    {
      id: '3',
      name: 'Ana Costa',
      email: 'ana@example.com',
      avatar: '/placeholder.svg?height=40&width=40',
      bio: 'Bióloga especializada em conservação e educação ambiental.',
      role: 'Educadora Ambiental'
    }
  ];

  private mockCategories: Category[] = [
    {
      id: '1', name: 'Energia Renovável', slug: 'energia-renovavel', color: '#4CAF50', description: 'Artigos sobre energia limpa e sustentável',
      icon: ''
    },
    {
      id: '2', name: 'Mudanças Climáticas', slug: 'mudancas-climaticas', color: '#2196F3', description: 'Impactos e soluções para o clima',
      icon: ''
    },
    {
      id: '3', name: 'Sustentabilidade', slug: 'sustentabilidade', color: '#FF9800', description: 'Práticas sustentáveis no dia a dia',
      icon: ''
    },
    {
      id: '4', name: 'Conservação', slug: 'conservacao', color: '#9C27B0', description: 'Preservação da natureza e biodiversidade',
      icon: ''
    },
    {
      id: '5', name: 'Tecnologia Verde', slug: 'tecnologia-verde', color: '#00BCD4', description: 'Inovações tecnológicas sustentáveis',
      icon: ''
    }
  ];

    private mockPosts: BlogPost[] = [
    {
      id: "1",
      title: "O Desperdício de Alimentos: Um Desafio Global",
      slug: "desperdicio-alimentos-desafio-global",
      excerpt: "Entenda como o desperdício de alimentos afeta o meio ambiente e a economia mundial, com dados atualizados e soluções práticas.",
      content: `
      # O Desperdício de Alimentos: Um Desafio Global

      O desperdício de alimentos é uma das questões mais urgentes do nosso tempo. Segundo a **Organização das Nações Unidas para Alimentação e Agricultura (FAO)**, aproximadamente **1,3 bilhão de toneladas** de alimentos são desperdiçados anualmente em todo o mundo.

      ## O Impacto Devastador

      ### Números que Chocam

      - **33%** de todos os alimentos produzidos são perdidos ou desperdiçados
      - **R$ 1 trilhão** é o valor econômico perdido anualmente
      - **3,3 gigatoneladas** de CO₂ são emitidas pelo desperdício de alimentos
      - **250 km³** de água são desperdiçados junto com os alimentos

      ### Onde Ocorre o Desperdício

      O desperdício acontece em toda a cadeia alimentar:

      1. **Produção Agrícola (24%)**: Perdas durante a colheita devido a condições climáticas, pragas ou falta de infraestrutura adequada.

      2. **Pós-colheita e Armazenamento (20%)**: Deterioração durante o transporte e armazenamento inadequado.

      3. **Processamento Industrial (12%)**: Perdas durante o processamento e embalagem dos alimentos.

      4. **Distribuição e Varejo (22%)**: Produtos que vencem nas prateleiras ou são rejeitados por questões estéticas.

      5. **Consumo Doméstico (22%)**: Alimentos que estragam em casa ou são descartados pelos consumidores.

      ## Soluções Práticas

      ### No Nível Individual

      **Planejamento Inteligente:**
      - Faça uma lista de compras baseada no que você realmente precisa
      - Planeje suas refeições com antecedência
      - Compre apenas o necessário para evitar excessos

      **Armazenamento Adequado:**
      - Aprenda a armazenar diferentes tipos de alimentos corretamente
      - Use recipientes herméticos para prolongar a vida útil
      - Organize sua geladeira por data de validade

      **Aproveitamento Total:**
      - Use cascas, talos e folhas em receitas criativas
      - Transforme sobras em novos pratos
      - Congele alimentos antes que estraguem

      ## Conclusão

      O desperdício de alimentos é um problema complexo que exige ação em todos os níveis da sociedade. Cada um de nós pode fazer a diferença através de escolhas conscientes e práticas sustentáveis.

      **Lembre-se:** Cada alimento que salvamos do desperdício é um passo em direção a um planeta mais sustentável e uma sociedade mais justa.
      `,
      author: "Dr. Maria Silva",
      date: "5 de agosto de 2025",
      readTime: "8 min",
      views: 1250,
      likes: 89,
      comments: 23,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=300&fit=crop",
      tags: ["Sustentabilidade", "Economia", "Meio Ambiente", "FAO", "Desperdício"],
      category: this.categories[0],
      featured: true,
      publishedAt: new Date(),
      updatedAt: new Date(),
      imageUrl: '',
      status: 'draft'
    },
    {
      id: "2",
      title: "Técnicas de Conservação de Alimentos para Reduzir Desperdício",
      slug: "tecnicas-conservacao-alimentos",
      excerpt: "Aprenda métodos práticos e científicos para prolongar a vida útil dos seus alimentos e economizar dinheiro.",
      author: "Chef João Santos",
      date: "3 de agosto de 2025",
      readTime: "7 min",
      views: 890,
      likes: 67,
      comments: 15,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop",
      tags: ["Dicas Práticas", "Conservação", "Economia Doméstica"],
      category: this.categories[0],
      content: '',
      publishedAt: new Date(),
      updatedAt: new Date(),
      featured: false,
      imageUrl: '',
      status: 'draft'
    },
    {
      id: "3",
      title: "O Impacto do Descarte Incorreto de Resíduos",
      slug: "impacto-descarte-incorreto-residuos",
      excerpt: "Descubra como o descarte inadequado afeta nosso planeta e nossa saúde, com dados científicos atualizados.",
      author: "Eng. Ana Costa",
      date: "4 de agosto de 2025",
      readTime: "6 min",
      views: 1100,
      likes: 78,
      comments: 19,
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&h=300&fit=crop",
      tags: ["Poluição", "Saúde Pública", "Meio Ambiente"],
      category: this.categories[1],
      featured: true,
      content: '',
      publishedAt: new Date(),
      updatedAt: new Date(),
      imageUrl: '',
      status: 'draft'
    },
    {
      id: "4",
      title: "Consumo Consciente de Água: Um Recurso Precioso",
      slug: "consumo-consciente-agua-recurso-precioso",
      excerpt: "A importância da água e como podemos usar este recurso de forma mais eficiente no nosso cotidiano.",
      author: "Dra. Lucia Mendes",
      date: "5 de agosto de 2025",
      readTime: "5 min",
      views: 987,
      likes: 72,
      comments: 16,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop",
      tags: ["Conservação", "Recursos Hídricos", "Sustentabilidade"],
      category: this.categories[2],
      featured: true,
      content: '',
      publishedAt: new Date(),
      updatedAt: new Date(),
      imageUrl: '',
      status: 'draft'
    },
    {
      id: "5",
      title: "Eficiência Energética: Iluminando o Futuro",
      slug: "eficiencia-energetica-iluminando-futuro",
      excerpt: "Como a eficiência energética pode transformar nossa relação com o planeta e reduzir custos.",
      author: "Dr. Roberto Alves",
      date: "5 de agosto de 2025",
      readTime: "7 min",
      views: 1340,
      likes: 95,
      comments: 27,
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&h=300&fit=crop",
      tags: ["Eficiência", "Energia Limpa", "Futuro"],
      category: this.categories[3],
      featured: true,
      content: '',
      publishedAt: new Date(),
      updatedAt: new Date(),
      imageUrl: '',
      status: 'draft'
    }
  ];
  posts: any;

  constructor() {
    this.postsSubject.next(this.mockPosts);
  }
   getAllPosts(): Observable<BlogPost[]> {
    return of(this.mockPosts);
  }

  getPostsByCategory(categorySlug: string): Observable<BlogPost[]> {
    return of(this.posts.filter((post: { category: { slug: string; }; }) => post.category.slug === categorySlug));
  }

  getPosts(filters?: BlogFilters, page: number = 1, limit: number = 10): Observable<PaginatedResponse<BlogPost>> {
    return of(this.mockPosts).pipe(
      delay(500),
      map(posts => {
        let filteredPosts = [...posts];

        if (filters) {
          if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filteredPosts = filteredPosts.filter(post =>
              post.title.toLowerCase().includes(searchTerm) ||
              post.excerpt.toLowerCase().includes(searchTerm) ||
              post.content.toLowerCase().includes(searchTerm)
            );
          }

          if (filters.category) {
            filteredPosts = filteredPosts.filter(post => post.category.slug === filters.category);
          }

          if (filters.tags && filters.tags.length > 0) {
            filteredPosts = filteredPosts.filter(post =>
              filters.tags!.some(tag => post.tags.includes(tag))
            );
          }

          if (filters.featured !== undefined) {
            filteredPosts = filteredPosts.filter(post => post.featured === filters.featured);
          }
        }

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

        return {
          data: paginatedPosts,
          total: filteredPosts.length,
          page,
          limit,
          totalPages: Math.ceil(filteredPosts.length / limit)
        };
      })
    );
  }

  getPostBySlug(slug: string): Observable<BlogPost | null> {
    return of(this.mockPosts.find(post => post.slug === slug) || null).pipe(delay(300));
  }

  getFeaturedPosts(limit: number = 3): Observable<BlogPost[]> {
    return of(this.mockPosts.filter(post => post.featured).slice(0, limit)).pipe(delay(200));
  }

  getRelatedPosts(postId: string, limit: number = 4): Observable<BlogPost[]> {
    const currentPost = this.mockPosts.find(post => post.id === postId);
    if (!currentPost) return of([]);

    const relatedPosts = this.mockPosts
      .filter(post => post.id !== postId)
      .filter(post => 
        post.category.id === currentPost.category.id ||
        post.tags.some(tag => currentPost.tags.includes(tag))
      )
      .slice(0, limit);

    return of(relatedPosts).pipe(delay(200));
  }

  getCategories(): Observable<Category[]> {
    return of(this.mockCategories).pipe(delay(100));
  }

  getAuthors(): Observable<Author[]> {
    return of(this.mockAuthors).pipe(delay(100));
  }

  createPost(post: Partial<BlogPost>): Observable<BlogPost> {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      slug: this.generateSlug(post.title || ''),
      publishedAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      likes: 0,
      comments: 0,
      status: 'draft',
      ...post
    } as BlogPost;

    this.mockPosts.unshift(newPost);
    this.postsSubject.next(this.mockPosts);

    return of(newPost).pipe(delay(500));
  }

  updatePost(id: string, updates: Partial<BlogPost>): Observable<BlogPost | null> {
    const postIndex = this.mockPosts.findIndex(post => post.id === id);
    if (postIndex === -1) return of(null);

    this.mockPosts[postIndex] = {
      ...this.mockPosts[postIndex],
      ...updates,
      updatedAt: new Date()
    };

    this.postsSubject.next(this.mockPosts);
    return of(this.mockPosts[postIndex]).pipe(delay(500));
  }

  deletePost(id: string): Observable<boolean> {
    const postIndex = this.mockPosts.findIndex(post => post.id === id);
    if (postIndex === -1) return of(false);

    this.mockPosts.splice(postIndex, 1);
    this.postsSubject.next(this.mockPosts);
    return of(true).pipe(delay(300));
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  searchPosts(query: string): Observable<BlogPost[]> {
    const filtered = this.mockPosts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
      (typeof post.author === 'object' && 'name' in post.author && post.author.name.toLowerCase().includes(query.toLowerCase()))
    );
    return of(filtered);
  }

  // Removed duplicate getCategories() implementation

  getBlogStats(): Observable<BlogStats> {
    const stats: BlogStats = {
      totalPosts: this.mockPosts.length,
      totalCategories: this.categories.length,
      totalViews: this.mockPosts.reduce((sum, post) => sum + post.views, 0),
      totalComments: this.mockPosts.reduce((sum, post) => sum + post.comments, 0)
    };
    return of(stats);
  }
}
