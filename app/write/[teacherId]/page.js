'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TEACHERS } from '@/lib/teachers';
import Link from 'next/link';

const PROMPTS = [
  'You always make class fun because...',
  'I appreciate how you...',
  'You are really good at explaining...',
  'Thank you for...',
  'My favorite thing about your class is...',
];

export default function WritePage() {
  const { teacherId } = useParams();
  const teacher = TEACHERS.find(t => t.id === teacherId);

  const [text, setText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [from, setFrom] = useState('');
  const [promptIndex, setPromptIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [sent, setSent] = useState(false);

  if (!teacher) return <p className="text-center mt-20 text-yellow-400">Teacher not found.</p>;

  async function submit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setSaving(true);
    try {
      await addDoc(collection(db, 'teacherJars', teacher.id, 'compliments'), {
        text: text.trim(),
        from: isAnonymous ? 'A student' : (from.trim() || 'A student'),
        opened: false,
        createdAt: serverTimestamp(),
      });
      setSent(true);
    } catch {
      alert('Something went wrong. Try again!');
    } finally {
      setSaving(false);
    }
  }

  if (sent) {
    return (
      <main className="min-h-screen bg-blue-950 flex flex-col items-center justify-center px-4 text-center">
        <div className="text-7xl mb-4">💛</div>
        <h2 className="text-3xl font-bold text-yellow-400 mb-2">Note sent!</h2>
        <p className="text-yellow-200 mb-8">{teacher.name} will love reading this 💛</p>
        <Link href="/" className="bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold px-6 py-3 rounded-full transition">
          ← Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-blue-950 flex flex-col items-center px-4 py-10">
      <div className="text-5xl mb-2">✍️</div>
      <h1 className="text-2xl font-bold text-yellow-400 mb-1">Write a note for</h1>
      <p className="text-xl font-semibold text-yellow-200 italic mb-6">{teacher.name}</p>

      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={() => setPromptIndex((promptIndex + 1) % PROMPTS.length)}
          className="w-full bg-blue-900 border border-yellow-600 rounded-xl p-4 text-left mb-4 hover:bg-blue-800 transition"
        >
          <p className="text-xs text-yellow-500 mb-1">Need inspiration? Click to shuffle:</p>
          <p className="text-yellow-200 italic">"{PROMPTS[promptIndex]}"</p>
        </button>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <textarea
              className="w-full border-2 border-yellow-600 rounded-xl p-4 bg-blue-900 text-yellow-100 placeholder-yellow-700 focus:outline-none focus:border-yellow-400 resize-none h-36"
              placeholder="Write something kind..."
              maxLength={200}
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <p className="text-right text-xs text-yellow-600">{text.length}/200</p>
          </div>

          <label className="flex items-center justify-between bg-blue-900 border border-yellow-700 rounded-xl px-4 py-3">
            <span className="text-yellow-200 font-medium">Send anonymously</span>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={e => setIsAnonymous(e.target.checked)}
              className="w-5 h-5 accent-yellow-400"
            />
          </label>

          {!isAnonymous && (
            <input
              type="text"
              className="w-full border-2 border-yellow-600 rounded-xl p-4 bg-blue-900 text-yellow-100 placeholder-yellow-700 focus:outline-none focus:border-yellow-400"
              placeholder="Your name..."
              maxLength={30}
              value={from}
              onChange={e => setFrom(e.target.value)}
            />
          )}

          <button
            type="submit"
            disabled={saving || !text.trim()}
            className="bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 text-blue-950 font-bold py-4 rounded-full text-lg transition"
          >
            {saving ? 'Sending...' : 'Send Note 🫙'}
          </button>
        </form>

        <Link href="/" className="block text-center text-yellow-500 text-sm mt-4 hover:underline">
          ← Pick a different teacher
        </Link>
      </div>
    </main>
  );
}
