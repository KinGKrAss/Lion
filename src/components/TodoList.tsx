/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Check, X } from 'lucide-react';
import { Todo } from '../../types/todo';
import { TodoStorage } from '../../services/todoStorage';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const formatDate = (timestamp?: number) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleDateString('de-DE', {
      month: 'short',
      day: 'numeric',
    });
  };

  const priorityColors = {
    high: 'border-red-500/50 bg-red-500/10',
    medium: 'border-yellow-500/50 bg-yellow-500/10',
    low: 'border-green-500/50 bg-green-500/10',
  };

  const priorityBadgeColors = {
    high: 'text-red-400',
    medium: 'text-yellow-400',
    low: 'text-green-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`p-4 rounded-lg border transition-all ${
        todo.completed
          ? 'border-white/10 bg-white/5 opacity-60'
          : priorityColors[todo.priority]
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            todo.completed
              ? 'bg-green-500/20 border-green-500'
              : 'border-gold-400 hover:bg-gold-400/10'
          }`}
        >
          {todo.completed && <Check className="w-4 h-4 text-green-400" />}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold truncate ${
              todo.completed ? 'line-through text-slate-400' : 'text-white'
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p className="text-sm text-slate-400 mt-1 line-clamp-2">{todo.description}</p>
          )}
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className={`text-xs font-semibold ${priorityBadgeColors[todo.priority]}`}>
              {todo.priority === 'high' ? '🔴' : todo.priority === 'medium' ? '🟡' : '🟢'} {todo.priority}
            </span>
            {todo.dueDate && (
              <span className="text-xs text-slate-400">📅 {formatDate(todo.dueDate)}</span>
            )}
            {todo.tags && todo.tags.length > 0 && (
              <div className="flex gap-1">
                {todo.tags.map(tag => (
                  <span key={tag} className="text-xs bg-gold-500/20 text-gold-300 px-2 py-0.5 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(todo)}
            className="p-2 hover:bg-gold-500/20 rounded-lg transition-colors"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  filter: 'all' | 'active' | 'completed' | 'high-priority';
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onEdit, filter }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 mb-4">Keine Aufgaben gefunden</p>
        <p className="text-sm text-slate-500">
          {filter === 'completed'
            ? 'Du hast noch keine Aufgaben abgeschlossen'
            : filter === 'high-priority'
            ? 'Keine hochprioritären Aufgaben'
            : 'Erstelle eine neue Aufgabe um zu beginnen'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default TodoList;
