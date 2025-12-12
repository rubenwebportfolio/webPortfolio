 export function initNavbar() {


  const nav = document.querySelector<HTMLElement>('#nav')!;
  const showAt = 120; 

  function setNavVisible(show: boolean) {
    if (show) {
      nav.classList.remove('-translate-y-full','opacity-0','pointer-events-none');
      nav.classList.add('translate-y-0','opacity-100');
    } else {
      nav.classList.add('-translate-y-full','opacity-0','pointer-events-none');
      nav.classList.remove('translate-y-0','opacity-100');
    }
  }

  const onScroll = () => setNavVisible((window.scrollY || 0) > showAt);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); 

  const sections = ['presentacion','proyectos','habilidades','contacto']
    .map(id => document.getElementById(id))
    .filter((el): el is HTMLElement => !!el);

  const linkById = new Map<string, HTMLAnchorElement>();
  document.querySelectorAll<HTMLAnchorElement>('a[data-nav]').forEach(a => {
    const key = a.dataset.nav!;
    linkById.set(key, a);
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const id = e.target.id;
      const link = linkById.get(id);
      if (!link) return;
      if (e.isIntersecting) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(s => io.observe(s));
}