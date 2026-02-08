import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import NameInputPage from '@/pages/NameInputPage';
import ProposalPage from '@/pages/ProposalPage';

import { Toaster } from '@/components/ui/toaster';

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<NameInputPage />} />
                <Route path="/valentine" element={<ProposalPage />} />
            </Routes>
            <Toaster />
        </BrowserRouter>
    );
}

export default App;