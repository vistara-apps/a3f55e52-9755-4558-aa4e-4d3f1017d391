'use client';

import { cn } from '../lib/utils';
import { NavigationTab, TabId } from '../lib/types';

interface NavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  tabs: NavigationTab[];
  className?: string;
}

export function Navigation({
  activeTab,
  onTabChange,
  tabs,
  className,
}: NavigationProps) {
  return (
    <nav className={cn(
      'fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur border-t border-border',
      className
    )}>
      <div className="container">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'flex flex-col items-center gap-1 py-2 px-3 rounded-md transition-colors duration-200',
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground/60 hover:text-foreground hover:bg-muted'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
