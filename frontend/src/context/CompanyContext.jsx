import React, { createContext, useContext, useState, useEffect } from 'react';
import { companyApi } from '../services/api';

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [siteSettings, setSiteSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCompanyData = async () => {
    try {
      const [compRes, setRes] = useState ? await Promise.all([
        companyApi.getCompanyInfo(),
        companyApi.getSiteSettings()
      ]) : [null, null];

      if (compRes?.data) setCompanyInfo(compRes.data);
      if (setRes?.data) setSiteSettings(setRes.data);
    } catch (err) {
      console.error("Error fetching company info:", err);
      // Fallback defaults if backend is momentarily unreachable
      setCompanyInfo({
        name: "BRANDVERSE",
        tagline: "Innovating Ideas. Building Digital Futures.",
        description: "BrandVerse is a technology-driven software development company focused on creating innovative digital solutions for businesses, startups, and enterprises.",
        email: "contact@brandverse.tech",
        phone: "+1 (555) 349-2810",
        address: "742 Evergreen Innovation Parkway, Suite 500, Tech City, CA 94025",
        stats: {
          completed_projects: "250+",
          happy_clients: "140+",
          team_experts: "50+",
          years_experience: "8+"
        }
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  return (
    <CompanyContext.Provider value={{ companyInfo, siteSettings, loading, refreshCompanyData: fetchCompanyData }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => useContext(CompanyContext);
