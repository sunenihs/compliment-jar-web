'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TEACHERS } from '@/lib/teachers';

export default function TeacherPage() {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('teacherUnlocked') === 'true') {
      setUnlocked(true);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (input === '6goldteachers') {
      sessionStorage.setItem('teacherUnlocked', 'true');
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setInput('');
    }
  }

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-blue-950 flex flex-col items-center justify-center px-4 text-center">
        <div className="text-6xl mb-3">🍎</div>
        <h1 className="font-rozha text-4xl text-yellow-400 mb-2">Teacher Page</h1>
        <p className="font-caveat text-2xl text-yellow-200 mb-8">Enter the password to continue</p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-xs">
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Password"
            className="w-full px-5 py-3 rounded-2xl bg-blue-900 border-2 border-yellow-500 text-yellow-100 text-lg text-center focus:outline-none focus:border-yellow-300 placeholder:text-yellow-700"
          />
          {error && <p className="font-caveat text-xl text-red-400">Incorrect password, try again!</p>}
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold px-8 py-3 rounded-full text-lg transition shadow-lg"
          >
            Enter 🍎
          </button>
        </form>
        <Link href="/" className="mt-8 text-sm text-yellow-500 hover:underline">← Back to Home</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-blue-950 flex flex-col items-center px-4 py-10">
      <div className="text-6xl mb-3">🍎</div>
      <h1 className="font-rozha text-4xl text-yellow-400 mb-1">Teacher Page</h1>
      <p className="font-caveat text-2xl text-yellow-200 mb-8 text-center">Tap your name to see your notes!</p>

      <div className="w-full max-w-md flex flex-col gap-3">
        {TEACHERS.map(teacher => (
          <Link key={teacher.id} href={`/teacher/jar/${teacher.id}`}>
            <div className="bg-blue-900 border-2 border-yellow-500 rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm hover:bg-blue-800 hover:border-yellow-300 transition cursor-pointer">
              <span className="text-2xl">🍎</span>
              <span className="flex-1 text-lg font-semibold text-yellow-300">{teacher.name}</span>
              <span className="text-yellow-500 text-xl">›</span>
            </div>
          </Link>
        ))}
      </div>

      <Link href="/" className="mt-10 text-sm text-blue-950 font-medium bg-yellow-400 px-5 py-2 rounded-full hover:bg-yellow-300 transition">
        ← Back to Home
      </Link>
    </main>
  );
}
