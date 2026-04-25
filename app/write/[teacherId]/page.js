'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  const router = useRouter();
  const teacher = TEACHERS.find(t => t.id === teacherId);

  const [text, setText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [from, setFrom] = useState('');
  const [promptIndex, setPromptIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [sent, setSent] = useState(false);

  if (!teacher) return <p className="text-center mt-20 text-pink-400">Teacher not found.</p>;

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
      <main className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4 text-center">
        <div className="text-7xl mb-4">🍎</div>
        <h2 className="text-3xl font-bold text-green-700 mb-2">Note sent!</h2>
        <p className="text-green-600 mb-8">{teacher.name} will love reading this 💚</p>
        <Link href="/" className="bg-pink-300 hover:bg-pink-400 text-white font-semibold px-6 py-3 rounded-full transition">
          ← Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-green-50 flex flex-col items-center px-4 py-10">
      <div className="text-5xl mb-2">✍️</div>
      <h1 className="text-2xl font-bold text-green-800 mb-1">Write a note for</h1>
      <p className="text-xl font-semibold text-green-600 italic mb-6">{teacher.name}</p>

      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={() => setPromptIndex((promptIndex + 1) % PROMPTS.length)}
          className="w-full bg-green-100 border border-green-200 rounded-xl p-4 text-left mb-4 hover:bg-green-200 transition"
        >
          <p className="text-xs text-green-500 mb-1">Need inspiration? Click to shuffle:</p>
          <p className="text-green-800 italic">"{PROMPTS[promptIndex]}"</p>
        </button>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <textarea
              className="w-full border-2 border-green-200 rounded-xl p-4 text-green-900 placeholder-green-300 focus:outline-none focus:border-green-400 resize-none h-36"
              placeholder="Write something kind..."
              maxLength={200}
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <p className="text-right text-xs text-green-400">{text.length}/200</p>
          </div>

          <label className="flex items-center justify-between bg-green-100 rounded-xl px-4 py-3">
            <span className="text-green-800 font-medium">Send anonymously</span>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={e => setIsAnonymous(e.target.checked)}
              className="w-5 h-5 accent-green-500"
            />
          </label>

          {!isAnonymous && (
            <input
              type="text"
              className="w-full border-2 border-green-200 rounded-xl p-4 text-green-900 placeholder-green-300 focus:outline-none focus:border-green-400"
              placeholder="Your name..."
              maxLength={30}
              value={from}
              onChange={e => setFrom(e.target.value)}
            />
          )}

          <button
            type="submit"
            disabled={saving || !text.trim()}
            className="bg-green-400 hover:bg-green-500 disabled:opacity-40 text-white font-bold py-4 rounded-full text-lg transition"
          >
            {saving ? 'Sending...' : 'Send Note 🫙'}
          </button>
        </form>

        <Link href="/" className="block text-center text-green-500 text-sm mt-4 hover:underline">
          ← Pick a different teacher
        </Link>
      </div>
    </main>
  );
}
