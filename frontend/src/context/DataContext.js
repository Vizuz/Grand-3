import React, { createContext, useContext, useState, useEffect } from 'react';
import dataService from '../services/dataService';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [applications, setApplications] = useState([]);
  const [analytics, setAnalytics] = useState({});

  // Загрузка данных при инициализации
  useEffect(() => {
    // Принудительно сбрасываем данные к начальным если их нет
    if (!localStorage.getItem('grand_projects') || JSON.parse(localStorage.getItem('grand_projects')).length === 0) {
      dataService.resetToDefaults();
    }
    loadData();
    trackVisitor();
  }, []);

  const loadData = () => {
    setProjects(dataService.getProjects());
    setApartments(dataService.getApartments());
    setApplications(dataService.getApplications());
    setAnalytics(dataService.getAnalytics());
  };

  const trackVisitor = () => {
    dataService.trackVisitor();
  };

  const trackPageView = (page) => {
    dataService.trackPageView(page);
  };

  const trackApartmentView = (apartmentId) => {
    dataService.trackApartmentView(apartmentId);
  };

  // ПРОЕКТЫ
  const addProject = (projectData) => {
    const newProject = dataService.addProject(projectData);
    setProjects(dataService.getProjects());
    return newProject;
  };

  const updateProject = (id, projectData) => {
    const updatedProject = dataService.updateProject(id, projectData);
    if (updatedProject) {
      setProjects(dataService.getProjects());
      setApartments(dataService.getApartments()); // Обновляем квартиры тоже
    }
    return updatedProject;
  };

  const deleteProject = (id) => {
    const success = dataService.deleteProject(id);
    if (success) {
      setProjects(dataService.getProjects());
      setApartments(dataService.getApartments());
    }
    return success;
  };

  // КВАРТИРЫ
  const addApartment = (apartmentData) => {
    const newApartment = dataService.addApartment(apartmentData);
    setApartments(dataService.getApartments());
    return newApartment;
  };

  const updateApartment = (id, apartmentData) => {
    const updatedApartment = dataService.updateApartment(id, apartmentData);
    if (updatedApartment) {
      setApartments(dataService.getApartments());
    }
    return updatedApartment;
  };

  const deleteApartment = (id) => {
    const success = dataService.deleteApartment(id);
    if (success) {
      setApartments(dataService.getApartments());
    }
    return success;
  };

  // ЗАЯВКИ
  const addApplication = (applicationData) => {
    const newApplication = dataService.addApplication(applicationData);
    setApplications(dataService.getApplications());
    setAnalytics(dataService.getAnalytics());
    return newApplication;
  };

  const updateApplicationStatus = (id, status) => {
    const updatedApplication = dataService.updateApplicationStatus(id, status);
    if (updatedApplication) {
      setApplications(dataService.getApplications());
      setAnalytics(dataService.getAnalytics());
    }
    return updatedApplication;
  };

  const deleteApplication = (id) => {
    const success = dataService.deleteApplication(id);
    if (success) {
      setApplications(dataService.getApplications());
    }
    return success;
  };

  // АНАЛИТИКА
  const getAdminStats = () => {
    return dataService.getAdminStats();
  };

  const getDetailedAnalytics = () => {
    return dataService.getDetailedAnalytics();
  };

  const value = {
    // Данные
    projects,
    apartments,
    applications,
    analytics,
    
    // Методы проектов
    addProject,
    updateProject,
    deleteProject,
    
    // Методы квартир
    addApartment,
    updateApartment,
    deleteApartment,
    
    // Методы заявок
    addApplication,
    updateApplicationStatus,
    deleteApplication,
    
    // Аналитика
    trackPageView,
    trackApartmentView,
    getAdminStats,
    getDetailedAnalytics,
    
    // Обновление
    loadData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
