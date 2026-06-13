/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Todo Storage Service
 * Manages local storage for todos with JSON serialization
 */

import { Todo, TodoStats } from '../types/todo';

const STORAGE_KEY = 'lingolion_todos';
const STATS_KEY = 'lingolion_todo_stats';

export class TodoStorage {
  /**
   * Get all todos from local storage
   */
  static getTodos(): Todo[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading todos from storage:', error);
      return [];
    }
  }

  /**
   * Save all todos to local storage
   */
  static saveTodos(todos: Todo[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      this.updateStats(todos);
    } catch (error) {
      console.error('Error saving todos to storage:', error);
    }
  }

  /**
   * Add a new todo
   */
  static addTodo(todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Todo {
    const todos = this.getTodos();
    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    todos.push(newTodo);
    this.saveTodos(todos);
    return newTodo;
  }

  /**
   * Update existing todo
   */
  static updateTodo(id: string, updates: Partial<Todo>): Todo | null {
    const todos = this.getTodos();
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return null;

    const todo = { ...todos[index], ...updates, updatedAt: Date.now() };
    todos[index] = todo;
    this.saveTodos(todos);
    return todo;
  }

  /**
   * Delete a todo
   */
  static deleteTodo(id: string): boolean {
    const todos = this.getTodos();
    const filtered = todos.filter(t => t.id !== id);
    if (filtered.length === todos.length) return false;
    this.saveTodos(filtered);
    return true;
  }

  /**
   * Toggle todo completion
   */
  static toggleTodo(id: string): Todo | null {
    const todo = this.getTodos().find(t => t.id === id);
    if (!todo) return null;
    return this.updateTodo(id, { completed: !todo.completed });
  }

  /**
   * Get todo by ID
   */
  static getTodoById(id: string): Todo | null {
    return this.getTodos().find(t => t.id === id) || null;
  }

  /**
   * Get filtered todos
   */
  static getFilteredTodos(filter: 'all' | 'active' | 'completed' | 'high-priority'): Todo[] {
    const todos = this.getTodos();
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      case 'high-priority':
        return todos.filter(t => t.priority === 'high' && !t.completed);
      default:
        return todos;
    }
  }

  /**
   * Get sorted todos
   */
  static getSortedTodos(todos: Todo[], sortBy: 'date' | 'priority' | 'title'): Todo[] {
    const sorted = [...todos];
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'date':
      default:
        return sorted.sort((a, b) => b.updatedAt - a.updatedAt);
    }
  }

  /**
   * Get statistics
   */
  static getStats(): TodoStats {
    const todos = this.getTodos();
    return {
      total: todos.length,
      completed: todos.filter(t => t.completed).length,
      pending: todos.filter(t => !t.completed).length,
      highPriority: todos.filter(t => t.priority === 'high' && !t.completed).length,
    };
  }

  /**
   * Update stats in local storage
   */
  private static updateStats(todos: Todo[]): void {
    const stats: TodoStats = {
      total: todos.length,
      completed: todos.filter(t => t.completed).length,
      pending: todos.filter(t => !t.completed).length,
      highPriority: todos.filter(t => t.priority === 'high' && !t.completed).length,
    };
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (error) {
      console.error('Error saving stats:', error);
    }
  }

  /**
   * Clear all todos
   */
  static clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STATS_KEY);
  }

  /**
   * Export todos as JSON
   */
  static exportTodos(): string {
    const todos = this.getTodos();
    return JSON.stringify(todos, null, 2);
  }

  /**
   * Import todos from JSON
   */
  static importTodos(jsonData: string): boolean {
    try {
      const todos = JSON.parse(jsonData);
      if (!Array.isArray(todos)) return false;
      this.saveTodos(todos);
      return true;
    } catch (error) {
      console.error('Error importing todos:', error);
      return false;
    }
  }
}
