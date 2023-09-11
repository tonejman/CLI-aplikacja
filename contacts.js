const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join("./db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const dataArray = JSON.parse(data.toString());
    console.table(dataArray);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath);
  const dataArray = JSON.parse(data.toString());
  const contact = dataArray.find((element) => element.id === contactId);
  if (contact) {
    console.log(`Downloaded contact for id=${contactId}:`);
    console.table([contact]);
  } else {
    console.log("Contact not found");
  }
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath);
  const dataArray = JSON.parse(data.toString());
  const newArray = dataArray.filter((element) => element.id !== contactId);
  if (dataArray.length > newArray.length) {
    fs.writeFile(contactsPath, JSON.stringify(newArray));
    console.log("Contact removed");
  } else {
    console.log("Contact not found");
  }
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath);
  const dataArray = JSON.parse(data.toString());

  if (name && email && phone) {
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    dataArray.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(dataArray));
    console.log(`Added ${name} to contact list`);
  } else {
    console.log("Not enough data");
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
