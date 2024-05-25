// src/pages/Contacts.tsx
import React, { useState } from 'react';
import './Contacts.css';

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', status: 'active' });
  const [formErrors, setFormErrors] = useState<{ firstName?: string; lastName?: string; phone?: string; email?: string }>({});
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, status: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { firstName?: string; lastName?: string; phone?: string; email?: string } = {};
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.phone) errors.phone = 'Phone is required';
    if (!formData.email) errors.email = 'Email is required';

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    if (isEditing !== null) {
      const updatedContacts = contacts.map((contact, index) => index === isEditing ? formData : contact);
      setContacts(updatedContacts);
      alert('Contact edited successfully');
    } else {
      setContacts([...contacts, formData]);
      alert('Contact saved successfully');
    }

    setFormData({ firstName: '', lastName: '', phone: '', email: '', status: 'active' });
    setShowForm(false);
    setIsEditing(null);
  };

  const handleEdit = (index: number) => {
    setFormData(contacts[index]);
    setIsEditing(index);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
    alert('Contact deleted successfully');
  };

  const handleCancel = () => {
    setFormData({ firstName: '', lastName: '', phone: '', email: '', status: 'active' });
    setShowForm(false);
    setIsEditing(null);
  };

  return (
    <div className="contacts-page">
      <div className="contacts-header">
        <h1>Contact Page</h1>
      </div>
      {!showForm && (
        <div className="create-contact-button-container">
          <button onClick={() => setShowForm(true)}>Create Contact</button>
        </div>
      )}
      {showForm && (
        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} onFocus={() => setShowForm(true)} />
            {formErrors.firstName && <span className="error">{formErrors.firstName}</span>}
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} onFocus={() => setShowForm(true)} />
            {formErrors.lastName && <span className="error">{formErrors.lastName}</span>}
            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} onFocus={() => setShowForm(true)} />
            {formErrors.phone && <span className="error">{formErrors.phone}</span>}
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} onFocus={() => setShowForm(true)} />
            {formErrors.email && <span className="error">{formErrors.email}</span>}
            <div className="status-field">
              <label>Status:</label>
              <label>
                <input type="radio" name="status" value="active" checked={formData.status === 'active'} onChange={handleStatusChange} />
                Active
              </label>
              <label>
                <input type="radio" name="status" value="inactive" checked={formData.status === 'inactive'} onChange={handleStatusChange} />
                Inactive
              </label>
            </div>
            <button type="submit">{isEditing !== null ? 'Save Editted Contact' : 'Save Contact'}</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      )}
      {!showForm && contacts.length === 0 ? (
        <div className="no-contacts">
          <span>&#x2716;</span> No Contact Found. Please add a contact from the Create Contact button.
        </div>
      ) : (
        <div className="contacts-list">
          {contacts.map((contact, index) => (
            <div key={index} className="contact-card">
              <h2>{contact.firstName} {contact.lastName}</h2>
              <p>{contact.phone}</p>
              <p>{contact.email}</p>
              <p>Status: {contact.status}</p>
              <div className="contact-actions">
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contacts;
