import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSkills } from '../hooks/useSkills';
import { Layout } from '../components/Layout';
import { SkillCard } from '../components/SkillCard';
import { SearchBar } from '../components/SearchBar';
import { SkillModal } from '../components/SkillModal';
import type { Skill } from '../types';

export const Marketplace = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { skills, loading, error } = useSkills();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  // Extract unique categories for sidebar
  const categories = useMemo(() => {
    const cats = new Set(skills.map(s => s.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [skills]);

  // Filter skills
  const filteredSkills = useMemo(() => {
    let result = skills;

    // 1. Filter by Category
    if (categoryId) {
      result = result.filter(s => s.category === categoryId);
    }

    // 2. Filter by Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [skills, categoryId, searchQuery]);

  if (loading) {
     return (
       <div className="flex h-screen items-center justify-center">
         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
       </div>
     );
  }

  if (error) {
    return <div className="text-destructive p-8">Error loading skills: {error}</div>;
  }

  return (
    <Layout categories={categories}>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            {categoryId ? `${categoryId.replace(/-/g, ' ')} Skills` : 'Explore Skills'}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Discover community-curated skills to empower your AI agents.
          </p>
          
          <div className="pt-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>

        {/* Results Grid */}
        <div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
             {filteredSkills.map(skill => (
               <SkillCard 
                 key={skill.id} 
                 skill={skill} 
                 onClick={() => setSelectedSkill(skill)} 
               />
             ))}
           </div>
           
           {filteredSkills.length === 0 && (
             <div className="text-center py-20">
               <p className="text-muted-foreground">No skills found matching your criteria.</p>
             </div>
           )}
        </div>
      </div>

      <SkillModal 
        skill={selectedSkill} 
        onClose={() => setSelectedSkill(null)} 
      />
    </Layout>
  );
};
