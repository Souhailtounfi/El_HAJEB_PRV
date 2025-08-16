import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NewsList from "./pages/NewsList";
import NewsForm from "./pages/NewsForm";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import NewsDetail from "./pages/NewsDetail";
import Footer from "./components/Footer";
import CreateUser from "./pages/CreateUser";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PresentationGenerale from "./pages/PresentationGenerale";
import ApercuHistorique from "./pages/ApercuHistorique";
import SituationGeographique from "./pages/SituationGeographique";
import "./styles/mobile-fixes.css";

function App() {
  const [lang, setLang] = useState("fr");

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-root flex flex-col min-h-screen">
          <Navbar lang={lang} setLang={setLang} />
          <main className="app-main flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/news" element={<NewsList lang={lang} />} />
              <Route path="/news/:id" element={<NewsDetail lang={lang} />} />
              {/* Admin Create Admin Route (protected) */}
              <Route
                path="/users"
                element={
                  <ProtectedRoute adminOnly>
                    <CreateUser />
                  </ProtectedRoute>
                }
              />
              {/* Presentation Générale section */}
              <Route
                path="/presentation-generale"
                element={<PresentationGenerale />}
              />
              <Route
                path="/presentation-generale/apercu-historique"
                element={<ApercuHistorique />}
              />
              <Route
                path="/presentation-generale/situation-geographique"
                element={<SituationGeographique />}
              />

              {/* Admin Routes */}
              <Route
                path="/news/new"
                element={
                  <ProtectedRoute adminOnly>
                    <NewsForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/news/:id/edit"
                element={
                  <ProtectedRoute adminOnly>
                    <NewsForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/news/:id/images"
                element={
                  <ProtectedRoute adminOnly>
                    <NewsForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/news-images/:id"
                element={
                  <ProtectedRoute adminOnly>
                    <NewsForm />
                  </ProtectedRoute>
                }
              />

              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to="/news" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
