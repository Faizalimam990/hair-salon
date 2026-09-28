export function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`brand ${light ? 'brand-light' : ''}`}
      href="#home"
      aria-label="Mens and Womens Family Salon home"
    >
      <span className="brand-symbol">
        m<span>&</span>w
      </span>
      <span className="brand-name">
        Mens & Womens<span>Family Salon</span>
      </span>
    </a>
  );
}
