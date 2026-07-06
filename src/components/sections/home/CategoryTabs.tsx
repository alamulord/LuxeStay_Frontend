import React from 'react';
import { LucideIcon } from 'lucide-react';
import { CategoryItem } from './CategoryItem';

interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onSelectCategory
}) => {
  return (
    <section className="max-w-page mx-auto px-6 lg:px-10 pt-10 pb-4 no-print select-none">
      <div className="flex items-center gap-8 overflow-x-auto hide-scrollbar pb-1 border-b border-outline-variant/10">
        {categories.map((cat) => (
          <CategoryItem
            key={cat.id}
            id={cat.id}
            label={cat.label}
            icon={cat.icon}
            isActive={activeCategory === cat.id}
            onClick={() => onSelectCategory(cat.id)}
          />
        ))}
      </div>
    </section>
  );
};
