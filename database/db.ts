// db.ts
import { SQLiteDatabase } from 'expo-sqlite';

// Tipos para nossa aplicação
export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  saved_at?: number;
  is_favorite?: number; // 0 ou 1
}

export interface Category {
  name: string;
  article_count: number;
}

// Operações do banco de dados
export const DatabaseService = {
  // Artigos
  async getArticles(db: SQLiteDatabase, limit: number = 10): Promise<Article[]> {
    return await db.getAllAsync<Article>(
      `SELECT id, title, content, category, saved_at, is_favorite
       FROM saved_articles
       ORDER BY saved_at DESC
       LIMIT ?`,
      [limit]
    );
  },

  async getArticleById(db: SQLiteDatabase, id: number): Promise<Article | null> {
    return await db.getFirstAsync<Article>(
      `SELECT id, title, content, category, saved_at, is_favorite
       FROM saved_articles
       WHERE id = ?`,
      [id]
    );
  },

  async searchArticles(db: SQLiteDatabase, query: string): Promise<Article[]> {
    return await db.getAllAsync<Article>(
      `SELECT id, title, content, category, saved_at
       FROM saved_articles
       WHERE title LIKE ? OR content LIKE ?
       ORDER BY saved_at DESC`,
      [`%${query}%`, `%${query}%`]
    );
  },

  async getArticlesByCategory(db: SQLiteDatabase, category: string): Promise<Article[]> {
    return await db.getAllAsync<Article>(
      `SELECT id, title, content, category, saved_at
       FROM saved_articles
       WHERE category = ?
       ORDER BY saved_at DESC`,
      [category]
    );
  },

  async getFavoriteArticles(db: SQLiteDatabase): Promise<Article[]> {
    return await db.getAllAsync<Article>(
      `SELECT id, title, content, category, saved_at
       FROM saved_articles
       WHERE is_favorite = 1
       ORDER BY saved_at DESC`
    );
  },

  async toggleFavorite(db: SQLiteDatabase, id: number): Promise<void> {
    await db.runAsync(
      `UPDATE saved_articles
       SET is_favorite = NOT is_favorite
       WHERE id = ?`,
      [id]
    );
  },

  // Categorias
  async getCategories(db: SQLiteDatabase): Promise<Category[]> {
    return await db.getAllAsync<Category>(
      `SELECT category as name, COUNT(*) as article_count
       FROM saved_articles
       GROUP BY category
       ORDER BY article_count DESC`
    );
  },

  // Inicialização (para desenvolvimento)
  async initializeDatabase(db: SQLiteDatabase): Promise<void> {
    // Verifica se a tabela existe
    const tableExists = await db.getFirstAsync<{ name: string }>(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='saved_articles'"
    );

    if (!tableExists) {
      await db.execAsync(`
        PRAGMA journal_mode = 'wal';

        CREATE TABLE IF NOT EXISTS saved_articles (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          content TEXT,
          category TEXT,
          is_favorite INTEGER DEFAULT 0,
          saved_at INTEGER DEFAULT (strftime('%s', 'now'))
        );

        PRAGMA user_version = 1;
      `);

      // Dados iniciais sobre LGPD
      await this.insertSampleData(db);
    }
  },

  async insertSampleData(db: SQLiteDatabase): Promise<void> {
    const sampleArticles: Omit<Article, 'id'>[] = [
      {
        title: 'O que é a LGPD?',
        content: 'A Lei Geral de Proteção de Dados (LGPD) é a legislação brasileira que regula as atividades de tratamento de dados pessoais...',
        category: 'Introdução'
      },
      {
        title: 'Direitos dos titulares',
        content: 'De acordo com a LGPD, os titulares dos dados pessoais têm diversos direitos, como acesso, correção, exclusão...',
        category: 'Direitos'
      },
      {
        title: 'Princípios da LGPD',
        content: 'A LGPD estabelece 10 princípios para o tratamento de dados: finalidade, adequação, necessidade...',
        category: 'Princípios'
      },
      {
        title: 'Sanções administrativas',
        content: 'As sanções por descumprimento da LGPD incluem advertência, multa simples de até 2% do faturamento...',
        category: 'Sanções'
      },
      {
        title: 'Dados sensíveis',
        content: 'O tratamento de dados sensíveis como origem racial, convicção religiosa, saúde etc. tem regras específicas...',
        category: 'Dados Sensíveis'
      }
    ];

    for (const article of sampleArticles) {
      await db.runAsync(
        'INSERT INTO saved_articles (title, content, category) VALUES (?, ?, ?)',
        [article.title, article.content, article.category]
      );
    }
  }
};

// Exportar o tipo para uso em outros arquivos
export type { SQLiteDatabase };