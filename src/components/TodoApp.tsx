/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Download, Upload, Trash2, CheckCircle2 } from 'lucide-react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import { Todo, FilterType, SortType, TodoStats } from '../types/todo';
import { TodoStorage } from '../services/todoStorage';

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('date');
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [stats, setStats] = useState<TodoStats>({
    total: 0,
    completed: 0,
    pending: 0,
    highPriority: 0,
  });

  // Load todos on mount
  useEffect(() => {
    const stored = TodoStorage.getTodos();
    setTodos(stored);
    updateStats(stored);
  }, []);

  const updateStats = (todoList: Todo[]) => {
    const newStats: TodoStats = {
      total: todoList.length,
      completed: todoList.filter(t => t.completed).length,
      pending: todoList.filter(t => !t.completed).length,
      highPriority: todoList.filter(t => t.priority === 'high' && !t.completed).length,
    };
    setStats(newStats);
  };

  const handleAddTodo = (todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTodo = TodoStorage.addTodo(todoData);
    const updated = TodoStorage.getTodos();
    setTodos(updated);
    updateStats(updated);
    setShowForm(false);
  };

  const handleEditTodo = (todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingTodo) return;
    TodoStorage.updateTodo(editingTodo.id, todoData);
    const updated = TodoStorage.getTodos();
    setTodos(updated);
    updateStats(updated);
    setEditingTodo(null);
    setShowForm(false);
  };

  const handleToggleTodo = (id: string) => {
    TodoStorage.toggleTodo(id);
    const updated = TodoStorage.getTodos();
    setTodos(updated);
    updateStats(updated);
  };

  const handleDeleteTodo = (id: string) => {
    if (confirm('Aufgabe wirklich löschen?')) {
      TodoStorage.deleteTodo(id);
      const updated = TodoStorage.getTodos();
      setTodos(updated);
      updateStats(updated);
    }
  };

  const handleClearCompleted = () => {
    if (confirm('Alle abgeschlossenen Aufgaben löschen?')) {
      const updated = todos.filter(t => !t.completed);
      TodoStorage.saveTodos(updated);
      setTodos(updated);
      updateStats(updated);
    }
  };

  const handleExport = () => {
    const data = TodoStorage.exportTodos();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const success = TodoStorage.importTodos(event.target.result);
        if (success) {
          const updated = TodoStorage.getTodos();
          setTodos(updated);
          updateStats(updated);
          alert('Aufgaben erfolgreich importiert!');
        } else {
          alert('Fehler beim Import!');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const getFilteredAndSortedTodos = () => {
    const filtered = TodoStorage.getFilteredTodos(filter);
    return TodoStorage.getSortedTodos(filtered, sort);
  };

  const displayTodos = getFilteredAndSortedTodos();
  const completionPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-royal-black text-white py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Aufgabenliste</h1>
              <p className="text-slate-400 text-sm">Organisiere deine Aufgaben mit Leichtigkeit</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-slate-400">Gesamt</p>
              <p className="text-2xl font-bold text-gold-400">{stats.total}</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-slate-400">Abgeschlossen</p>
              <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-slate-400">Ausstehend</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-slate-400">Fortschritt</p>
              <p className="text-2xl font-bold text-blue-400">{completionPercentage}%</p>
            </div>
          </div>

          {/* Progress Bar */}
          {stats.total > 0 && (
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden mb-6">
              <motion.div
                className="h-full gold-gradient"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          <button
            onClick={() => {
              setEditingTodo(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg gold-gradient text-black font-semibold hover:shadow-lg hover:shadow-gold-500/50 transition-all"
          >
            <Plus className="w-4 h-4" />
            Neue Aufgabe
          </button>

          {/* Filter */}
          <div className="flex gap-1 flex-wrap">
            {(['all', 'active', 'completed', 'high-priority'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  filter === f
                    ? 'bg-gold-500 text-black'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {f === 'all'
                  ? 'Alle'
                  : f === 'active'
                  ? 'Aktiv'
                  : f === 'completed'
                  ? 'Abgeschlossen'
                  : '🔴 Dringend'}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value as SortType)}
            className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-gold-400 outline-none font-semibold text-sm"
          >
            <option value="date">Nach Datum</option>
            <option value="priority">Nach Priorität</option>
            <option value="title">Nach Titel</option>
          </select>

          {/* Actions */}
          <div className="ml-auto flex gap-2">
            <button
              onClick={handleExport}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Export"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={handleImport}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Import"
            >
              <Upload className="w-5 h-5" />
            </button>
            {stats.completed > 0 && (
              <button
                onClick={handleClearCompleted}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                title="Abgeschlossene löschen"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Todo List */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 10 }} transition={{ delay: 0.2 }}>
          <TodoList
            todos={displayTodos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            onEdit={todo => {
              setEditingTodo(todo);
              setShowForm(true);
            }}
            filter={filter}
          />
        </motion.div>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <TodoForm
            onSubmit={editingTodo ? handleEditTodo : handleAddTodo}
            onCancel={() => {
              setShowForm(false);
              setEditingTodo(null);
            }}
            initialTodo={editingTodo || undefined}
            isEdit={!!editingTodo}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TodoApp;
