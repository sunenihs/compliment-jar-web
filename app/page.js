import Link from 'next/link';
import { TEACHERS } from '@/lib/teachers';

export default function Home() {
  return (
    <main className="min-h-screen bg-pink-50 flex flex-col items-center px-4 py-10">
      <div className="text-6xl mb-3">💛</div>
      <h1 className="text-4xl font-bold text-pink-700 mb-1">Kindness Jar for 6 Gold</h1>
      <p className="text-pink-500 mb-8 text-center">Pick a teacher and leave them a kind note!</p>

      <div className="w-full max-w-md flex flex-col gap-3">
        {TEACHERS.map(teacher => (
          <Link key={teacher.id} href={`/write/${teacher.id}`}>
            <div className="bg-white border-2 border-pink-200 rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm hover:shadow-md hover:border-pink-400 transition cursor-pointer">
              <span className="text-2xl">🍎</span>
              <span className="flex-1 text-lg font-semibold text-pink-800">{teacher.name}</span>
              <span className="text-pink-300 text-xl">›</span>
            </div>
          </Link>
        ))}
      </div>

      <Link href="/teacher" className="mt-10 text-sm text-green-700 font-medium bg-green-100 px-5 py-2 rounded-full hover:bg-green-200 transition">
        I'm a Teacher 🍎
      </Link>
    </main>
  );
}
