// Decorative animated background: a gradient layer plus `count` floating dots.
// variant="page" renders .page-particles/.page-particle-N (inner pages),
// variant="home" renders .home-particles/.home-particle-N (home hero).
const Particles = ({ variant = 'page', count = 8, className = '' }) => (
  <>
    <div className={`${variant}-particles ${className}`.trim()} aria-hidden="true" />
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className={`${variant}-particle ${variant}-particle-${i + 1}`} aria-hidden="true" />
    ))}
  </>
);

export default Particles;
