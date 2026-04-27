import { Icon } from "@phosphor-icons/react";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  icon: Icon;
  iconColor: string;
  trendColor?: string;
}

export default function StatCard({ title, value, trend, icon: IconComponent, iconColor, trendColor }: StatCardProps) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[12px] p-[24px] shadow-[var(--shadow-sm)]">
      <div className="flex justify-between items-center mb-[16px]">
        <span className="uppercase text-[13px] text-[var(--text-muted)] tracking-[0.05em] font-medium">{title}</span>
        <IconComponent weight="fill" className="text-[18px]" style={{ color: iconColor }} />
      </div>
      <div className="font-unbounded font-bold text-[32px] text-[var(--text-primary)] mb-[8px]">
        {value}
      </div>
      {trend && (
        <div className="text-[12px] font-medium" style={{ color: trendColor || 'var(--green)' }}>
          {trend}
        </div>
      )}
    </div>
  );
}