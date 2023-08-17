import React, { ReactNode, useState } from 'react';
import { Box } from '@mui/material';
import { SearchModal } from '@components/Modals';
import Header from '@components/Header';

interface ILayout {
  children: ReactNode;
}

export default function Layout({ children }: ILayout) {
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const handleSearchModal = (value: boolean, data: string) => {
    setOpenSearchModal(value);
    setModalTitle(data);
  };
  return (
    <Box sx={{ background: '#E4E8F0', height: '100vh', overflowY: 'auto' }}>
      <SearchModal
        title={modalTitle}
        openSearchModal={openSearchModal}
        setOpenSearchModal={setOpenSearchModal}
      />
      <Header handleSearchModal={handleSearchModal} />
      <Box>{children}</Box>
    </Box>
  );
}
