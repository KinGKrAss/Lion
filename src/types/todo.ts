/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: number;
  createdAt: number;
  updatedAt: number;
  tags?: string[];
}

export interface TodoStats {
  total: number;
  completed: number;
  pending: number;
  highPriority: number;
}

export type FilterType = 'all' | 'active' | 'completed' | 'high-priority';
export type SortType = 'date' | 'priority' | 'title';
