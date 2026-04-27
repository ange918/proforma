import { Link } from "wouter";

export default function NavBar() {
  return (
    <header className="bg-white border-b border-[var(--border)] h-[64px] px-[clamp(24px,6vw,80px)] sticky top-0 z-50 flex justify-between items-center">
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <span className="font-unbounded font-bold text-[var(--green)]">PROFORMA</span>
          <span className="font-unbounded font-normal text-[var(--gold)]">AFRICA</span>
        </div>
      </Link>
      
      <nav className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--green)] transition-colors">Fonctionnalités</a>
        <a href="#pricing" className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--green)] transition-colors">Tarifs</a>
        <a href="#about" className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--green)] transition-colors">À propos</a>
      </nav>

      <Link href="/dashboard">
        <button className="bg-[var(--green)] text-white font-unbounded text-[13px] py-[10px] px-[24px] rounded-[6px] hover:bg-[var(--green-dark)] transition-colors">
          Commencer gratuitement
        </button>
      </Link>
    </header>
  );
}