'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ImageIcon, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useCoverImage } from '@/hooks/use-cover-image';
import { api } from '../../convex/_generated/api';
import { useMutation } from 'convex/react';
import { Id } from '../../convex/_generated/dataModel';

interface CoverImageProps {
  url?: string;
  preview?: string;
}

export const Cover = ({ url, preview }: CoverImageProps) => {
  const params = useParams();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemove = () => {
    removeCoverImage({
      id: params.documentId as Id<'documents'>,
    });
  };

  return (
    <div
      className={cn(
        'relative w-full h-[40vh] group',
        !url && 'h-[12vh]',
        url && 'bg-muted'
      )}
    >
      {!!url && (
        <Image src={url} fill alt='cover image' className='object-cover' />
      )}
      {url && !preview && (
        <div className='opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2'>
          <Button
            onClick={coverImage.onOpen}
            className='text-muted-foreground text-xs'
            variant='outline'
            size='sm'
          >
            <ImageIcon className='h4 w-4 mr-2' />
            Change Cover
          </Button>

          <Button
            onClick={onRemove}
            className='text-muted-foreground text-xs'
            variant='outline'
            size='sm'
          >
            <X className='h-4 w-4 mr-2' />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};
