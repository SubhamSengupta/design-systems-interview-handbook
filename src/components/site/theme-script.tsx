// Runs before paint (blocking, in <head>) to apply the saved theme class to
// <html> and avoid a light->dark flash on load. Kept as a tiny inline script
// rather than a client component because client components only run after
// hydration, which is too late to prevent FOUC.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('handbook:theme');
    var theme = stored || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export function ThemeScript() {
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
