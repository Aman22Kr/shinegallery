import React from 'react';
import { Artworks } from './Artworks';

export const Sculptures: React.FC = () => {
  return (
    <Artworks
      initialCategory="sculpture"
      pageTitle="Sculptures & Three-Dimensional Masterpieces"
      pageSubtitle="Cast bronze, hand-hammered brass, and mixed-media sculptural installations curated for luxury foyers, executive boardrooms, and estate landscapes."
    />
  );
};
