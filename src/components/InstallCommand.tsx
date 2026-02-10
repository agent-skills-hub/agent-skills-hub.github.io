import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import type { Skill } from '../types';

interface InstallCommandProps {
  skill: Skill;
}

type Platform = 'cursor' | 'claude' | 'gemini' | 'codex' | 'openclaw' | 'default';

export const InstallCommand: React.FC<InstallCommandProps> = ({ skill }) => {
  const [platform, setPlatform] = useState<Platform>('claude');
  const [copied, setCopied] = useState(false);

  const command = `npx agent-skills-hub install ${skill.name}${platform !== 'default' ? ` --${platform}` : ''}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm border border-border">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
          Installation
        </label>
        <div className="flex items-center gap-2">
           <span className="text-xs text-muted-foreground">Platform:</span>
           <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform)}
            className="bg-transparent border-none text-xs text-primary font-medium focus:ring-0 cursor-pointer"
           >
             <option value="cursor">Cursor</option>
             <option value="claude">Claude</option>
             <option value="gemini">Gemini</option>
             <option value="codex">Codex</option>
             <option value="openclaw">OpenClaw</option>
             <option value="default">Default</option>
           </select>
        </div>
      </div>
      
      <div className="flex items-center gap-2 bg-background p-3 rounded-md border border-input">
        <Terminal className="w-4 h-4 text-muted-foreground shrink-0" />
        <span className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {command}
        </span>
        <button
          onClick={copyToClipboard}
          className="hover:bg-accent p-1.5 rounded-md transition-colors"
          title="Copy command"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>
    </div>
  );
};
