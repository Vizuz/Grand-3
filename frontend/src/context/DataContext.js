import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo
} from 'react';
import dataService from '../services/dataService';

export const DataContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Удобный хук вместо прямого useContext(DataContext)
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  /* ---- Заявки из Mongo ---- */
  const [applications, setApplications] = useState([]);
  const [apartments, setApartments] = useState([]);

  // ======= Applications CRUD =======
  const fetchApplications = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/applications`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      console.error('Failed to fetch applications:', err);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const addApplication = (application) => {
    setApplications((prev) => [application, ...prev]);
  };

  // ======= Apartments CRUD =======
  const fetchApartments = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/apartments`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setApartments(data);
    } catch (err) {
      console.error('Failed to fetch apartments:', err);
    }
  }, []);

  useEffect(() => {
    fetchApartments();
  }, [fetchApartments]);

  const addApartment = async (apartment) => {
    try {
      const res = await fetch(`${API_URL}/apartments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apartment)
      });
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setApartments((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Failed to add apartment:', err);
      throw err;
    }
  };

  const updateApartment = async (id, apartment) => {
    try {
      const res = await fetch(`${API_URL}/apartments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apartment)
      });
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setApartments((prev) =>
        prev.map((a) => (a.id === id ? data : a))
      );
      return data;
    } catch (err) {
      console.error('Failed to update apartment:', err);
      throw err;
    }
  };

  const deleteApartment = async (id) => {
    try {
      const res = await fetch(`${API_URL}/apartments/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Network response was not ok');
      setApartments((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error('Failed to delete apartment:', err);
      throw err;
    }
  };

  // ============================
  // Остальные методы dataService, проекты и т.п.
  const bindServiceMethods = () => {
    const proto = Object.getPrototypeOf(dataService);
    const methods = {};
    Object.getOwnPropertyNames(proto).forEach((k) => {
      if (k !== 'constructor' && typeof dataService[k] === 'function') {
        methods[k] = dataService[k].bind(dataService);
      }
    });
    return methods;
  };

  const serviceMethods = useMemo(bindServiceMethods, []);

  const contextValue = useMemo(() => {
    const projects = dataService.getProjects();

    return {
      ...serviceMethods, // trackPageView и др.
      projects,
      apartments,           // теперь реальные данные из MongoDB
      applications,
      addApplication,
      refreshApplications: fetchApplications,
      refreshApartments: fetchApartments,
      addApartment,
      updateApartment,
      deleteApartment
    };
  }, [applications, apartments, serviceMethods, fetchApplications, fetchApartments]);

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
