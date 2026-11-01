import React from 'react';
import { Artworks } from './Artworks';

export const Serigraphs: React.FC = () => {
  return (
    <Artworks
      initialCategory="serigraph"
      pageTitle="Limited Edition Serigraphs & Master Silkscreens"
      pageSubtitle="Hand-pulled, pencil-signed, and numbered fine art prints on archival 300gsm cotton rag paper by legendary masters like S.H. Raza and Thota Vaikuntam."
    />
  );
};
