import { useState, useEffect } from "react";
import LeadsList from "../components/LeadsList";
import LeadForm from "../components/LeadForm";
import toast, { Toaster } from 'react-hot-toast';


const LeadsPage = () => {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    const response = await fetch("/api/leads");
    const data = await response.json();
    if (data.success) {
      setLeads(data.data);
    } else {
      toast.error("Failed to fetch leads", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: "Bounce",
        });
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleCreateLead = async (formData) => {
    const response = await fetch("/api/leads/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const { message } = await response.json();
      toast.error(`Error: ${message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: "Bounce",
        });
    } else {
      toast.success('Lead created successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: "Bounce",
        });
      fetchLeads();
    }
  };

  const handleDeleteLead = async (id) => {
    const response = await fetch(`/api/leads/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const { message } = await response.json();
      toast.error(`Error: ${message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: "Bounce",
        });
    } else {
      toast.success('Lead Deleted successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: "Bounce",
        });
      fetchLeads();
    }
  };

  const handleUpdateLead = async (id, updatedData) => {
    const response = await fetch(`/api/leads/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const { message } = await response.json();
      toast.error(`Error: ${message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: "Bounce",
        });
    } else {
      toast.success('Lead updated successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: "Bounce",
        });
      fetchLeads();
    }
  };

  return (
    <div>
      <LeadForm onSubmit={handleCreateLead} />
      <LeadsList
        leads={leads}
        onDelete={handleDeleteLead}
        onUpdate={handleUpdateLead}
      />
      <Toaster/>
    </div>
  );
};

export default LeadsPage;
