import React, { useEffect } from 'react';
import { X, ExternalLink, AlertTriangle } from 'lucide-react';
import type { Skill } from '../types';
import { InstallCommand } from './InstallCommand';
import { createPortal } from 'react-dom';

interface SkillModalProps {
  skill: Skill | null;
  onClose: () => void;
}

export const SkillModal: React.FC<SkillModalProps> = ({ skill, onClose }) => {

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (skill) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [skill, onClose]);

  if (!skill) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div 
        className="relative w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-accent transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col gap-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary uppercase tracking-wide">
                {skill.category}
              </span>
              {skill.risk && skill.risk !== 'unknown' && skill.risk !== 'safe' && (
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive uppercase tracking-wide">
                  <AlertTriangle className="w-3 h-3" />
                  Risk: {skill.risk}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold tracking-tight">{skill.name}</h2>
          </div>

          {/* Description */}
          <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
            <p>{skill.description}</p>
          </div>

          {/* Source Info */}
          {skill.source && skill.source !== 'unknown' && (
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
               <span className="font-medium text-foreground">Source:</span>
               {skill.source.startsWith('http') ? (
                 <a 
                   href={skill.source} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center gap-1 hover:text-primary hover:underline"
                 >
                   {new URL(skill.source).hostname} <ExternalLink className="w-3 h-3" />
                 </a>
               ) : (
                 <span>{skill.source}</span>
               )}
             </div>
          )}

          {/* Install Command */}
          <InstallCommand skill={skill} />

        </div>
      </div>
    </div>,
    document.body
  );
};
