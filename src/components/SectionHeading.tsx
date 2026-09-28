import type { ReactNode } from 'react';
export function SectionHeading({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading" data-reveal>
      <div>
        <span className="section-label">
          <span />
          {label}
        </span>
        <h2>{title}</h2>
      </div>
      {children ? <div className="section-heading-aside">{children}</div> : null}
    </div>
  );
}
