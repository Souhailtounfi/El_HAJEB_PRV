import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NewsList from "./pages/NewsList";
import NewsForm from "./pages/NewsForm";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import NewsDetail from "./pages/NewsDetail";
import Footer from "./components/Footer";
import Admins from "./pages/Admins";
import CreateUser from "./pages/CreateUser";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ApercuHistorique from "./pages/ApercuHistorique";
import SituationGeographique from "./pages/SituationGeographique";
import OrganisationAdministrative from "./pages/OrganisationAdministrative";
import MilieuNaturel from "./pages/MilieuNaturel";
import SuperficiePopulation from "./pages/SuperficiePopulation";
import ReseauRoutier from "./pages/ReseauRoutier";
import EauElectricite from "./pages/EauElectricite";
import Habitat from "./pages/Habitat";
import Environnement from "./pages/Environnement";
import Enseignement from "./pages/Enseignement";
import FormationProfessionnelle from "./pages/FormationProfessionnelle";
 import Sante from "./pages/Sante";
import ProtectionCivile from "./pages/ProtectionCivile";
import EntraideAssociatif from "./pages/EntraideAssociatif";
import JeunesseSports from "./pages/JeunesseSports";
import Indh from "./pages/Indh";
import SecteurPriveChampReligieux from "./pages/SecteurPriveChampReligieux";
import Agriculture from "./pages/Agriculture";
import Carrieres from "./pages/Carrieres";
import EauxForets from "./pages/EauxForets";
import IndustrieCommerce from "./pages/IndustrieCommerce";
import Tourisme from "./pages/Tourisme";
import Artisanat from "./pages/Artisanat";
import Investissements from "./pages/Investissements";
import ContactsUtiles from "./pages/ContactsUtiles";
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
              {/* Confidential Login Route (hidden from UI, accessible via secret path and shortcut Ctrl+Alt+A) */}
              <Route path="/_admin-prvc-login-2025" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/news" element={<NewsList lang={lang} />} />
              <Route path="/news/:id" element={<NewsDetail lang={lang} />} />
              {/* Admins management page (protected, strong admin only) */}
              <Route
                path="/admins"
                element={
                  <ProtectedRoute>
                    <Admins />
                  </ProtectedRoute>
                }
              />
              {/* Create User page (protected, strong admin only) */}
              <Route
                path="/create-user"
                element={
                  <ProtectedRoute adminOnly>
                    <CreateUser />
                  </ProtectedRoute>
                }
              />
              {/* Navbar Links section */}
              <Route
                path="/presentation-generale/apercu-historique"
                element={<ApercuHistorique />}
              />
              <Route
                path="/presentation-generale/situation-geographique"
                element={<SituationGeographique />}
              />
              <Route
                path="/presentation-generale/organisation-administrative"
                element={<OrganisationAdministrative />}
              />
              <Route
                path="/presentation-generale/milieu-naturel"
                element={<MilieuNaturel />}
              />
              <Route
                path="/presentation-generale/superficie-population"
                element={<SuperficiePopulation />}
              />
              <Route
                path="/infrastructures-base/reseau-routier"
                element={<ReseauRoutier />}
              />
              <Route
                path="/infrastructures-base/eau-electricite"
                element={<EauElectricite />}
              />
              <Route
                path="/infrastructures-base/habitat"
                element={<Habitat />}
              />
              <Route
                path="/infrastructures-base/environnement"
                element={<Environnement />}
              />
              <Route
                path="/secteurs-sociaux/enseignement"
                element={<Enseignement />}
              />
              <Route
                path="/secteurs-sociaux/formation-professionnelle"
                element={<FormationProfessionnelle />}
              />
              <Route
                path="/secteurs-sociaux/sante"
                element={<Sante />}
              />
              <Route
                path="/secteurs-sociaux/protection-civile"
                element={<ProtectionCivile />}
              />
              <Route
                path="/secteurs-sociaux/entraide-associatif"
                element={<EntraideAssociatif />}
              />
              <Route
                path="/secteurs-sociaux/jeunesse-sports"
                element={<JeunesseSports />}
              />
              <Route
                path="/secteurs-sociaux/indh"
                element={<Indh />}
              />
              <Route
                path="/secteurs-sociaux/secteur-prive-champ-religieux"
                element={<SecteurPriveChampReligieux />}
              />
              <Route
                path="/secteurs-productifs/agriculture"
                element={<Agriculture />}
              />
              <Route
                path="/secteurs-productifs/carrieres"
                element={<Carrieres />}
              />
              <Route
                path="/secteurs-productifs/eaux-forets"
                element={<EauxForets />}
              />
              <Route
                path="/secteurs-productifs/industrie-commerce"
                element={<IndustrieCommerce />}
              />
              <Route
                path="/secteurs-productifs/tourisme"
                element={<Tourisme />}
              />
              <Route
                path="/secteurs-productifs/artisanat"
                element={<Artisanat />}
              />
              <Route
                path="/secteurs-productifs/investissements"
                element={<Investissements />}
              />
              <Route
                path="/secteurs-productifs/contacts-utiles"
                element={<ContactsUtiles />}
              />

              {/* Admin Routes */}
              <Route
                path="/news/new"
                element={
                  <ProtectedRoute>
                    <NewsForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/news/:id/edit"
                element={
                  <ProtectedRoute>
                    <NewsForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/news/:id/images"
                element={
                  <ProtectedRoute>
                    <NewsForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/news-images/:id"
                element={
                  <ProtectedRoute>
                    <NewsForm />
                  </ProtectedRoute>
                }
              />

              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
