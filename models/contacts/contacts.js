const path = require("path");
const fs = require("fs/promises");
const ObjectId = require("bson-objectid");
const contactsPath = path.join(__dirname, "contacts.json");
console.log("contactsPath:", contactsPath);

const updateFile = async (contact) => {
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
};

async function getListContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await getListContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  return contact;
}

async function removeContact(contactId) {
  const contacts = await getListContacts();

  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    console.log("contact not found");
    return;
  }

  const newContacts = contacts.filter((contact) => contact.id !== contactId);
  await updateFile(newContacts);
}

async function addContact(name, email, phone) {
  const contacts = await getListContacts();
  const newContact = {
    id: ObjectId(),
    name,
    email,
    phone,
  };

  for (const contact of contacts) {
    if (contact.id === newContact.id) {
      return;
    }
  }

  contacts.push(newContact);
  await updateFile(contacts);
  return newContact;
}

async function updateContactById(id, name, email, phone) {
  const contacts = await getListContacts();
  const contactIndex = contacts.findIndex((contact) => id === contact.id);
  if (contactIndex === -1) {
    console.log("Contact not found");
    return;
  }
  const newContacts = contacts.map((contact) => {
    if (contact.id !== id) {
      return contact;
    }
    const newContact = contact;
    if (name) {
      newContact.name = name;
    }
    if (email) {
      newContact.email = email;
    }
    if (phone) {
      newContact.phone = phone;
    }
    return newContact;
  });

  await updateFile(newContacts);

  return await getContactById(id);
}

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
