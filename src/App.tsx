import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { AboutPage } from './pages/AboutPage';
import { ArticlePage } from './pages/ArticlePage';
import { SubchapterPage } from './pages/SubchapterPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="relative min-h-screen">
                <div className="relative z-10 font-sans">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/article/:id" element={<ArticlePage />} />
                        <Route path="/article/:id/read/:subId" element={<SubchapterPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
