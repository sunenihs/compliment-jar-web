'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, onSnapshot, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TEACHERS } from '@/lib/teachers';
import Link from 'next/link';

export default function TeacherJarPage() {
  const { teacherId } = useParams();
  const teacher = TEACHERS.find(t => t.id === teacherId);
  const [compliments, setCompliments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [opening, setOpening] = useState(null);

  useEffect(() => {
    if (!teacher) return;
    const q = query(collection(db, 'teacherJars', teacher.id, 'compliments'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      setCompliments(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsubscribe;
  }, [teacher?.id]);

  async function openNote(item) {
    setOpening(item.id);
    await updateDoc(doc(db, 'teacherJars', teacher.id, 'compliments', item.id), { opened: true });
    setOpening(null);
  }

  if (!teacher) return <p className="text-center mt-20 text-yellow-400">Teacher not found.</p>;
  if (loading) return <p className="text-center mt-20 text-yellow-400">Loading...</p>;

  if (!revealed) {
    return (
      <main className="min-h-screen bg-blue-950 flex flex-col items-center justify-center px-4 text-center">
        <div className="text-8xl mb-4">🎁</div>
        <h2 className="font-rozha text-4xl text-yellow-400 mb-2">You have a surprise!</h2>
        <p className="font-caveat text-2xl text-yellow-200 mb-8">
          {compliments.length === 0
            ? 'No notes yet — check back soon! 💛'
            : `Your students left you ${compliments.length} kind note${compliments.length !== 1 ? 's' : ''}!`}
        </p>
        <button
          onClick={() => setRevealed(true)}
          disabled={compliments.length === 0}
          className="bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 text-blue-950 font-bold px-8 py-4 rounded-full text-xl transition shadow-lg"
        >
          Reveal My Notes 🎉
        </button>
        <Link href="/teacher" className="mt-6 text-sm text-yellow-500 hover:underline">
          ← Back
        </Link>
      </main>
    );
  }

  const unread = compliments.filter(c => !c.opened).length;

  return (
    <main className="min-h-screen bg-blue-950 flex flex-col items-center px-4 py-10">
      <div className="text-5xl mb-2">💛</div>
      <h1 className="font-rozha text-4xl text-yellow-400 mb-1">{teacher.name}</h1>
      <p className="font-caveat text-xl text-yellow-300 mb-6">
        {unread > 0 ? `${unread} unread note${unread > 1 ? 's' : ''}!` : 'All caught up!'}
      </p>

      <div className="w-full max-w-md flex flex-col gap-3">
        {compliments.map(item => (
          <div
            key={item.id}
            onClick={() => !item.opened && openNote(item)}
            className={`rounded-2xl px-5 py-4 border-2 transition cursor-pointer
              ${item.opened
                ? 'bg-blue-900 border-yellow-700'
                : 'bg-blue-800 border-yellow-400 hover:border-yellow-200'}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.opened ? '💛' : '🎀'}</span>
              <div className="flex-1">
                <p className="text-yellow-100 font-medium">
                  {item.opened ? item.text : (opening === item.id ? 'Opening...' : 'Click to open...')}
                </p>
                <p className="font-caveat text-lg text-yellow-500 mt-1">From: {item.from}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link href="/teacher" className="mt-8 text-sm text-yellow-500 hover:underline">
        ← Back to Teacher Page
      </Link>
    </main>
  );
}
