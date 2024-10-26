import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { WatchlistProvider } from './contexts/WatchlistContext';
import { SearchPage } from './pages/SearchPage';
import { CompanyDetails } from './pages/CompanyDetails';
import { PersonDetails } from './pages/PersonDetails';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <WatchlistProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors">
              <Header />
              <div className="flex-grow flex">
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<SearchPage />} />
                    <Route path="/company/:id" element={<CompanyDetails />} />
                    <Route path="/person/:name" element={<PersonDetails />} />
                  </Routes>
                </main>
                <Sidebar />
              </div>
              <Footer />
            </div>
          </Router>
        </WatchlistProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}