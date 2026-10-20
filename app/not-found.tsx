import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-cream px-6 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-5xl">Página no encontrada · Page not found</h1>
        <Link href="/" className="btn-primary mt-8">Inicio · Home</Link>
      </div>
    </main>
  );
}
