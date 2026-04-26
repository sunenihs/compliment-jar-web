import Link from 'next/link';
import { TEACHERS } from '@/lib/teachers';

export default function Home() {
  return (
    <main className="min-h-screen bg-blue-950 flex flex-col items-center px-4 py-10">
      <div className="text-6xl mb-3">💛</div>
      <h1 className="font-rozha text-5xl text-yellow-400 mb-1">Kindness Jar for 6 Gold</h1>
      <p className="font-caveat text-2xl text-yellow-200 mb-8 text-center">Pick a teacher and leave them a kind note!</p>

      <div className="w-full max-w-md flex flex-col gap-3">
        {TEACHERS.map(teacher => (
          <Link key={teacher.id} href={`/write/${teacher.id}`}>
            <div className="bg-blue-900 border-2 border-yellow-500 rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm hover:shadow-lg hover:bg-blue-800 hover:border-yellow-300 transition cursor-pointer">
              <span className="text-2xl">{teacher.emoji}</span>
              <span className="flex-1 text-lg font-semibold text-yellow-300">{teacher.name}</span>
              <span className="text-yellow-500 text-xl">›</span>
            </div>
          </Link>
        ))}
      </div>

      <Link href="/teacher" className="mt-10 text-sm text-blue-950 font-medium bg-yellow-400 px-5 py-2 rounded-full hover:bg-yellow-300 transition">
        I'm a Teacher 🍎
      </Link>
    </main>
  );
}
