export function toggleCollapsible(element) {
  const isCollapsed = element.getAttribute('data-collapsed') === 'true';

  const collapseSection = () => {
    const sectionHeight = element.scrollHeight;

    const elementTransition = element.style.transition;
    element.style.transition = '';

    requestAnimationFrame(() => {
      element.style.height = `${sectionHeight}px`;
      element.style.transition = elementTransition;

      requestAnimationFrame(() => {
        element.style.height = `${0}px`;
      });
    });

    element.setAttribute('data-collapsed', 'true');
  };

  const expandSection = () => {
    const sectionHeight = element.scrollHeight;
    element.style.height = `${sectionHeight}px`;
    element.setAttribute('data-collapsed', 'false');
  };

  if (isCollapsed) {
    expandSection(element);
  } else {
    collapseSection(element);
  }

  function transitionend() {
    if (element.getAttribute('data-collapsed') === 'false') {
      element.removeEventListener('transitionend', transitionend);
      element.style.height = 'auto';
    }
  }

  element.addEventListener('transitionend', transitionend);
}
