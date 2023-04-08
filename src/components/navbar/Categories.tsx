'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Container, CategoryBox, categories } from '@/components';

const Categories = () => {
  const params = useSearchParams();
  const categoryParam = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) return null;

  return (
    <Container>
      <div className='flex flex-row items-center justify-between overflow-x-auto pt-4'>
        {categories.map((category) => (
          <CategoryBox
            key={category.label}
            label={category.label}
            icon={category.icon}
            selected={categoryParam === category.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
