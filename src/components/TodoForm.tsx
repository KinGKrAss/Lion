/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Plus } from 'lucide-react';
import { Todo } from '../../types/todo';

interface TodoFormProps {
  onSubmit: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  initialTodo?: Todo;
  isEdit?: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, onCancel, initialTodo, isEdit }) => {
  const [title, setTitle] = useState(initialTodo?.title || '');
  const [description, setDescription] = useState(initialTodo?.description || '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(initialTodo?.priority || 'medium');
  const [dueDate, setDueDate] = useState(
    initialTodo?.dueDate ? new Date(initialTodo.dueDate).toISOString().split('T')[0] : ''
  );
  const [tags, setTags] = useState(initialTodo?.tags?.join(', ') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      dueDate: dueDate ? new Date(dueDate).getTime() : undefined,
      completed: initialTodo?.completed || false,
      tags: tags
        .split(',')
        .map(t => t.trim())
        .filter(t => t),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <motion.form
        onClick={e => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-royal-dark rounded-2xl border border-gold-400/30 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{isEdit ? 'Aufgabe bearbeiten' : 'Neue Aufgabe'}</h2>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2">Titel *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Aufgabentitel"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-gold-400 focus:bg-white/15 outline-none transition-colors"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">Beschreibung</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Aufgabenbeschreibung (optional)"
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-gold-400 focus:bg-white/15 outline-none transition-colors resize-none"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-semibold mb-2">Priorität</label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                    priority === p
                      ? p === 'high'
                        ? 'bg-red-500 text-white'
                        : p === 'medium'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-green-500 text-white'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {p === 'high' ? '🔴' : p === 'medium' ? '🟡' : '🟢'} {p === 'high' ? 'Hoch' : p === 'medium' ? 'Mittel' : 'Niedrig'}
                </button>
              ))}
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-semibold mb-2">Fälligkeitsdatum</label>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-gold-400 focus:bg-white/15 outline-none transition-colors"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold mb-2">Tags (Komma-getrennt)</label>
            <input
              type="text"
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="arbeit, wichtig, persönlich"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-gold-400 focus:bg-white/15 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/5 transition-colors font-semibold"
          >
            Abbrechen
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 rounded-lg gold-gradient text-black font-semibold hover:shadow-lg hover:shadow-gold-500/50 transition-all"
          >
            {isEdit ? 'Speichern' : 'Erstellen'}
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default TodoForm;
