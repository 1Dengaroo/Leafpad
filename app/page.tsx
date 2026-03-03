import { MarkdownWorkspace } from '@/components/markdown-workspace';
import { SettingsDialog } from '@/components/settings-dialog';
import { AboutDialog } from '@/components/about-dialog';

export default function EditorPage() {
  return (
    <div className="bg-background text-foreground flex h-screen flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold tracking-tight">Leafpad</span>
          <span className="text-muted-foreground text-xs">
            Ad-free, clean, modern markdown editor
          </span>
        </div>
        <div className="flex gap-2">
          <SettingsDialog />
          <AboutDialog />
        </div>
      </div>

      {/* Main content */}
      <MarkdownWorkspace />
    </div>
  );
}
