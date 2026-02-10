export interface Skill {
  id: string;
  path: string;
  category: string;
  name: string;
  description: string;
  risk: string;
  source: string;
}

export interface SkillIndex extends Array<Skill> {}
