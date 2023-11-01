import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <h1 className="text-6xl font-bold">Forms List</h1>
      <div className="flex flex-col gap-4">
        <Link href="/form-using-only-react">
          <div className="text-3xl font-bold bg-slate-600 px-4 py-2 rounded-xl hover:bg-slate-300 hover:text-blue-600">
            Form just using React
          </div>
        </Link>

        <Link href="/form-using-react-hook-form">
          <div className="text-3xl font-bold bg-slate-600 px-4 py-2 rounded-xl hover:bg-slate-300 hover:text-blue-600">
            Form using React Hook Form
          </div>
        </Link>

        <Link href="/form-using-react-hook-form-zod">
          <div className="text-3xl font-bold bg-slate-600 px-4 py-2 rounded-xl hover:bg-slate-300 hover:text-blue-600">
            Form using React Hook Form & Zod
          </div>
        </Link>
      </div>
    </main>
  );
}
