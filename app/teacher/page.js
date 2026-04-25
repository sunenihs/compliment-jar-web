import Link from 'next/link';
import { TEACHERS } from '@/lib/teachers';

export default function TeacherPage() {
  return (
    <main className="min-h-screen bg-green-50 flex flex-col items-center px-4 py-10">
      <div className="text-6xl mb-3">🍎</div>
      <h1 className="text-3xl font-bold text-green-800 mb-1">Teacher Page</h1>
      <p className="text-green-600 mb-8 text-center">Tap your name to see your notes!</p>

      <div className="w-full max-w-md flex flex-col gap-3">
        {TEACHERS.map(teacher => (
          <Link key={teacher.id} href={`/teacher/jar/${teacher.id}`}>
            <div className="bg-white border-2 border-green-200 rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm hover:shadow-md hover:border-green-400 transition cursor-pointer">
              <span className="text-2xl">🍎</span>
              <span className="flex-1 text-lg font-semibold text-green-800">{teacher.name}</span>
              <span className="text-green-300 text-xl">›</span>
            </div>
          </Link>
        ))}
      </div>

      <Link href="/" className="mt-10 text-sm text-pink-600 font-medium bg-pink-100 px-5 py-2 rounded-full hover:bg-pink-200 transition">
        ← Back to Home
      </Link>
    </main>
  );
}
