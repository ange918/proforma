import { Link, useLocation } from "wouter";
import { SquaresFour, FileText, Receipt, Users, Gear } from "@phosphor-icons/react";

export default function SideBar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: SquaresFour },
    { href: "/devis", label: "Devis", icon: FileText },
    { href: "/factures", label: "Factures", icon: Receipt },
    { href: "/clients", label: "Clients", icon: Users },
    { href: "/parametres", label: "Paramètres", icon: Gear },
  ];

  return (
    <aside className="w-[240px] hidden md:flex flex-col bg-[var(--text-primary)] py-[24px] h-screen shrink-0">
      <div className="px-[20px] mb-[32px]">
        <Link href="/">
          <div className="cursor-pointer">
            <span className="font-unbounded font-bold text-[18px] text-[var(--green)]">PROFORMA</span>
            <span className="font-unbounded font-normal text-[18px] text-[var(--gold)]">AFRICA</span>
          </div>
        </Link>
      </div>

      <nav className="px-[12px] flex flex-col gap-[4px] flex-1">
        {navItems.map((item) => {
          const isActive = location === item.href || location.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-[12px] py-[10px] px-[16px] rounded-[8px] text-[14px] font-medium cursor-pointer transition-all duration-150 ${
                  isActive
                    ? "bg-[rgba(255,255,255,0.1)] text-white"
                    : "text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.07)]"
                }`}
              >
                <item.icon
                  weight={isActive ? "fill" : "regular"}
                  className="text-[20px]"
                />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-[20px] pt-[16px] border-t border-[rgba(255,255,255,0.08)] flex items-center gap-[12px]">
        <div className="w-[36px] h-[36px] rounded-full bg-[var(--green)] flex items-center justify-center text-white font-unbounded text-[14px] shrink-0">
          DI
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-[13px] text-white truncate">Digital Innovation</span>
          <span className="text-[11px] text-[rgba(255,255,255,0.4)] truncate">contact@digitalinnovation.bj</span>
        </div>
      </div>
    </aside>
  );
}