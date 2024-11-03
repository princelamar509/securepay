// src/components/ContactsPage.jsx
import React from 'react';

const ContactsPage = ({ user }) => {
  const { frequentContacts } = user;

  return (
    <div className="contacts-page">
      <h2>Frequent Contacts</h2>
      <ul>
        {frequentContacts.length > 0 ? (
          frequentContacts.map((contact, index) => (
            <li key={index} className="contact-item">
              <p>
                <strong>Contact ID:</strong> {contact}
              </p>
              {/* Add additional contact details if available */}
            </li>
          ))
        ) : (
          <p>No contacts found.</p>
        )}
      </ul>


    </div>
  );
};

export default ContactsPage;
