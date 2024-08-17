import { useState, useEffect } from 'react';
import LeadsList from '../components/LeadsList';

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => setLeads(data.data));
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl mb-4">Leads</h1>
      <LeadsList leads={leads} />
    </div>
  );
};

export default LeadsPage;
