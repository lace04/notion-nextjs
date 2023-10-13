'use client';

import Image from 'next/image';
import { useUser } from '@clerk/clerk-react';
import { PlusCircle } from 'lucide-react';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';
import { api } from '../../../../../convex/_generated/api';
import { Button } from '@/components/ui/button';

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: 'Untitled' });

    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'Note created!',
      error: 'Something went wrong!',
    });
  };

  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image
        src='/empty.png'
        width='300'
        height='300'
        alt='Empty'
        className='dark:hidden'
      />
      <Image
        src='/empty-dark.png'
        width='300'
        height='300'
        alt='Empty'
        className='hidden dark:block'
      />
      <h2 className='text-lg font-medium'>
        Welcome to {user?.firstName}&apos;s Notion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className='w-4 h-4 mr-2' />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
