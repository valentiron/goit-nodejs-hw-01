const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join("db", "contacts.json");
const { nanoid } = require("nanoid");
require("colors");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const neededContacts = JSON.parse(data);

    if (neededContacts.length < 1)
      return console.log("Contacts list is empty!".red);

    return neededContacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const neededContacts = JSON.parse(data);
    const contact = neededContacts.find(
      (c) => Number(c.id) === Number(contactId)
    );

    if (!contact)
      return console.log(`Сontact with id: ${contactId} was not found!`.yellow);

    return contact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const neededContacts = JSON.parse(data);

    const filterContact = neededContacts.filter(
      (c) => Number(c.id) !== Number(contactId)
    );

    await fs.writeFile(contactsPath, JSON.stringify(filterContact));
    console.log(`Contact with ID: ${contactId} was deleted`.green);
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const neededContacts = JSON.parse(data);

    const newContact = { id: nanoid(), name, email, phone };
    const updatedContacts = [...neededContacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    console.log((`A contact with name: ${name} has been added`).green);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
