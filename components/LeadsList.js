import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { FaSortAlphaDown } from "react-icons/fa";
import "../styles/leadsList.css";

const LeadsList = ({ onDelete, onUpdate }) => {
  const [leads, setLeads] = useState([]);
  const [editingLeadId, setEditingLeadId] = useState(null);
  const [updatedLeadData, setUpdatedLeadData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetchLeads();
  }, [searchTerm, sortOrder]);

  const fetchLeads = async () => {
    const query = new URLSearchParams({
      search: searchTerm,
      sort: sortOrder,
    }).toString();

    const response = await fetch(`/api/leads?${query}`);
    const data = await response.json();
    if (data.success) {
      setLeads(data.data);
    } else {
      alert("Failed to fetch leads");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleEditClick = (lead) => {
    setEditingLeadId(lead._id);
    setUpdatedLeadData(lead);
  };

  const handleUpdateChange = (e) => {
    setUpdatedLeadData({
      ...updatedLeadData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    onUpdate(editingLeadId, updatedLeadData);
    setEditingLeadId(null);
  };

  return (
    <div className="component-container">
      <div className="header">
        <div className="search-container">
          <IoSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="dropdown">
          <div className="button-outline">
            <FaSortAlphaDown className="icon" />
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="dropdown-content"
            >
              <option value="" disabled>Sort By</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
        </div>
      </div>

      <main className="main-content">
      <table className="table">
        <thead className="table-header">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Product</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              {editingLeadId === lead._id ? (
                <>
                  <td className="table-input">
                    <input
                      type="text"
                      name="name"
                      value={updatedLeadData.name}
                      onChange={handleUpdateChange}
                      className="input-u"
                    />
                  </td>
                  <td className="table-input">
                    <input
                      type="email"
                      name="email"
                      value={updatedLeadData.email}
                      onChange={handleUpdateChange}
                      className="input-u"
                    />
                  </td>
                  <td className="table-input">
                    <input
                      type="text"
                      name="number"
                      value={updatedLeadData.number}
                      onChange={handleUpdateChange}
                      className="input-u"
                    />
                  </td>
                  <td className="table-input">
                    <input
                      type="text"
                      name="product"
                      value={updatedLeadData.product}
                      onChange={handleUpdateChange}
                      className="input-u"
                    />
                  </td>
                  <td className="table-cell table-actions">
                    <button
                      onClick={handleUpdateSubmit}
                      className="button-sm button-outline"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingLeadId(null)}
                      className="button-sm button-outline"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="table-cell">{lead.name}</td>
                  <td className="table-cell">{lead.email}</td>
                  <td className="table-cell">{lead.number}</td>
                  <td className="table-cell">{lead.product}</td>
                  <td className="table-cell table-actions">
                    <button
                      onClick={() => handleEditClick(lead)}
                      className="button-sm button-outline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(lead._id)}
                      className="button-sm button-outline-destructive"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      </main>
      
    </div>
  );
};

export default LeadsList;
