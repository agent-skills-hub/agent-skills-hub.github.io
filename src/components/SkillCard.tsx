import React from 'react';
import type { Skill } from '../types';
import { ArrowRight } from 'lucide-react';

interface SkillCardProps {
  skill: Skill;
  onClick: () => void;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative flex flex-col justify-between p-8 min-h-[280px] bg-card hover:bg-accent/50 border border-border rounded-2xl transition-all cursor-pointer hover:shadow-lg"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {skill.category}
          </span>
        </div>
        <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
          {skill.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {skill.description}
        </p>
      </div>
      
      <div className="flex items-center text-sm font-medium text-primary mt-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        View Details <ArrowRight className="w-4 h-4 ml-1.5" />
      </div>
    </div>
  );
};
