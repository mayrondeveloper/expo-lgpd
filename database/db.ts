// db.ts
import { SQLiteDatabase } from 'expo-sqlite';
import initialArticles from '@/database/articles'

// Tipos para nossa aplicação
export interface Article {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  date: string;
  readingTime: string;
  isFavorite: number; // 0 ou 1
  tags: string;
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
      `SELECT id, title, summary, content, category, date, readingTime, isFavorite, tags
       FROM saved_articles
       ORDER BY date DESC
       LIMIT ?`,
      [limit]
    );
  },

  async getArticleById(db: SQLiteDatabase, id: number): Promise<Article | null> {
    return await db.getFirstAsync<Article>(
      `SELECT id, title, summary, content, category, date, readingTime, isFavorite, tags
       FROM saved_articles
       WHERE id = ?`,
      [id]
    );
  },

  async searchArticles(db: SQLiteDatabase, query: string): Promise<Article[]> {
    return await db.getAllAsync<Article>(
      `SELECT id, title, summary, content, category, date, readingTime, isFavorite, tags
       FROM saved_articles
       WHERE title LIKE ? OR content LIKE ? OR summary LIKE ? OR tags LIKE ?
       ORDER BY date DESC`,
      [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`]
    );
  },

  async getArticlesByCategory(db: SQLiteDatabase, category: string): Promise<Article[]> {
    return await db.getAllAsync<Article>(
      `SELECT id, title, summary, content, category, date, readingTime, isFavorite, tags
       FROM saved_articles
       WHERE category = ?
       ORDER BY date DESC`,
      [category]
    );
  },

  async getFavoriteArticles(db: SQLiteDatabase): Promise<Article[]> {
    return await db.getAllAsync<Article>(
      `SELECT id, title, summary, content, category, date, readingTime, isFavorite, tags
       FROM saved_articles
       WHERE isFavorite = 1
       ORDER BY date DESC`
    );
  },

  async toggleFavorite(db: SQLiteDatabase, id: number): Promise<void> {
    await db.runAsync(
      `UPDATE saved_articles
       SET isFavorite = NOT isFavorite
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

  async saveArticle(db: SQLiteDatabase, article: Article): Promise<void> {
        await db.runAsync(
          `INSERT OR REPLACE INTO saved_articles
           (id, title, summary, content, category, date, readingTime, isFavorite, tags)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            article.id,
            article.title,
            article.summary,
            article.content,
            article.category,
            article.date,
            article.readingTime,
            article.isFavorite ? 1 : 0,
            article.tags
          ]
        );
      },

      async toggleFavorite(db: SQLiteDatabase, id: number): Promise<void> {
        await db.runAsync(
          `UPDATE saved_articles
           SET isFavorite = CASE WHEN isFavorite = 1 THEN 0 ELSE 1 END
           WHERE id = ?`,
          [id]
        );
      },

      async getFavoriteArticles(db: SQLiteDatabase): Promise<Article[]> {
        return await db.getAllAsync<Article>(
          `SELECT * FROM saved_articles
           WHERE isFavorite = 1
           ORDER BY date DESC`
        );
      },

      async isArticleSaved(db: SQLiteDatabase, id: number): Promise<boolean> {
        const result = await db.getFirstAsync<{count: number}>(
          `SELECT COUNT(*) as count FROM saved_articles
           WHERE id = ? AND isFavorite = 1`,
          [id]
        );
        return result?.count > 0;
      },

  // Inicialização (para desenvolvimento)
  async initializeDatabase(db: SQLiteDatabase): Promise<void> {
    console.log('initializeDB');

    //     Obtém lista de todas as tabelas e exclui
    const tables = await db.getAllAsync<{ name: string }>(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
    );

    for (const table of tables) {
      await db.execAsync(`DROP TABLE IF EXISTS ${table.name}`);
    }

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
          summary TEXT NOT NULL,
          content TEXT NOT NULL,
          category TEXT NOT NULL,
          date TEXT NOT NULL,
          readingTime TEXT NOT NULL,
          isFavorite BOOLEAN NOT NULL,
          tags TEXT NOT NULL
        );

        PRAGMA user_version = 1;
      `);
    }
  },

  async insertSampleData(db: SQLiteDatabase): Promise<void> {
    for (const article of initialArticles) {
      await db.runAsync(
        'INSERT INTO saved_articles (title, summary, content, category, date, readingTime, isFavorite, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          article.title,
          article.summary,
          article.content,
          article.category,
          article.date,
          article.readingTime,
          article.isFavorite ? 1 : 0,
          article.tags
        ]
      );
    }
  }


};

// Exportar o tipo para uso em outros arquivos
export type { SQLiteDatabase };