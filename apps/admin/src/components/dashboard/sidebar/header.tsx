// Node Modules
import { memo } from 'react';

// Components
import {
  useSidebar,
  SidebarHeader as SidebarHeaderBase,
} from '@repo/ui/components/base/sidebar';

// Utils
import { cn } from '@repo/ui/lib/utils';

interface SidebarHeaderProps {
  className?: string;
}

function SidebarHeader({ className }: SidebarHeaderProps) {
  const { state } = useSidebar();

  if (state === 'collapsed') {
    return (
      <SidebarHeaderBase
        className={cn(
          'border-sidebar-border bg-sidebar/50 h-16 border-b',
          className,
        )}
      >
        <div className="flex size-full items-center justify-center p-3">
          <div className="ring-primary/20 relative flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/5 shadow-sm ring-1">
            <img
              src="/favicon.png"
              alt="DSPLN Admin"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </div>
      </SidebarHeaderBase>
    );
  }

  return (
    <SidebarHeaderBase
      className={cn(
        'border-sidebar-border bg-sidebar/50 h-16 border-b',
        className,
      )}
    >
      <div className="flex items-center gap-3 px-3">
        <img
          src="/favicon.png"
          alt="DSPLN Admin"
          width={40}
          height={40}
          className="object-contain"
        />

        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-1">
            <span className="text-sidebar-foreground text-base font-bold tracking-tight">
              DSPLN
            </span>
          </div>
          <span className="text-sidebar-foreground/60 text-xs font-medium">
            Admin Dashboard
          </span>
        </div>
      </div>
    </SidebarHeaderBase>
  );
}

export default memo(SidebarHeader);
