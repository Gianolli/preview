document.addEventListener('DOMContentLoaded', () => {
  const diagram = document.querySelector('.lifecycle-layout');
  if (!diagram) return;
  const links = [...diagram.querySelectorAll('[data-cycle-step]')];
  const details = [...diagram.querySelectorAll('.lifecycle-detail')];
  function select(index) {
    links.forEach((link, i) => {
      link.classList.toggle('is-selected', i === index);
      if (i === index) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
    details.forEach((detail, i) => { detail.hidden = i !== index; });
  }
  diagram.classList.add('is-interactive');
  const initial = links.findIndex(link => link.hash === location.hash);
  select(initial >= 0 ? initial : 0);
  links.forEach((link, index) => {
    link.setAttribute('aria-controls', 'cycle-detail-' + (index + 1));
    link.addEventListener('click', event => {
      event.preventDefault();
      select(index);
      details[index].focus({ preventScroll: true });
      if (matchMedia('(max-width: 760px)').matches) {
        details[index].scrollIntoView({ block: 'nearest', behavior: 'instant' });
      }
    });
  });
});
