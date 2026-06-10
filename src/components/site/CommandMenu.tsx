import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useRouter } from '@tanstack/react-router';
import { entries } from '@/routes/journal';

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/50 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-lg overflow-hidden border border-foreground/20 bg-background text-foreground shadow-2xl">
        <Command.Input
          placeholder="Search OBJEKT..."
          className="w-full border-b border-foreground/10 bg-transparent p-4 font-mono text-lg outline-none placeholder:text-foreground/40"
        />
        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="p-6 text-center font-mono text-sm opacity-60">No results found.</Command.Empty>

          <Command.Group heading="Navigation" className="px-2 py-2 font-mono text-xs font-medium text-foreground/40">
            {[
              { label: 'Home', path: '/' },
              { label: 'Work', path: '/work' },
              { label: 'Journal', path: '/journal' },
              { label: 'Contact', path: '/contact' },
            ].map((route) => (
              <Command.Item
                key={route.path}
                onSelect={() => {
                  router.navigate({ to: route.path });
                  setOpen(false);
                }}
                className="cursor-pointer px-3 py-3 font-mono text-sm transition-colors aria-selected:bg-foreground/10 aria-selected:text-accent"
              >
                {route.label}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Journal" className="mt-4 px-2 py-2 font-mono text-xs font-medium text-foreground/40">
            {entries.map((entry) => (
              <Command.Item
                key={entry.slug}
                onSelect={() => {
                  router.navigate({ to: '/journal/$slug', params: { slug: entry.slug } });
                  setOpen(false);
                }}
                className="cursor-pointer px-3 py-3 font-mono text-sm transition-colors aria-selected:bg-foreground/10 aria-selected:text-accent"
              >
                {entry.t}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
}
