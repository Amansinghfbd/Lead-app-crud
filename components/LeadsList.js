import { useState, useEffect } from 'react';

const LeadsList = ({ leads }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedLeads, setSortedLeads] = useState(leads);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    const filteredLeads = leads.filter((lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.number.includes(searchTerm) ||
      lead.product.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSortedLeads(filteredLeads);
  }, [searchTerm, leads]);

  const handleSort = (field) => {
    const direction = sortDirection === 'asc' ? 'desc' : 'asc';
    const sorted = [...sortedLeads].sort((a, b) => {
      if (direction === 'asc') {
        return a[field].localeCompare(b[field]);
      } else {
        return b[field].localeCompare(a[field]);
      }
    });
    setSortDirection(direction);
    setSortedLeads(sorted);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search leads..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4"
      />
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th onClick={() => handleSort('number')}>Number</th>
            <th onClick={() => handleSort('product')}>Product</th>
          </tr>
        </thead>
        <tbody>
          {sortedLeads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.number}</td>
              <td>{lead.product}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsList;
