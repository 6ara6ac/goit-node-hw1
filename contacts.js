const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");


 const contactsPath = path.join(__dirname, './db/contacts.json');



// TODO: задокументировать каждую функцию
const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  }
  
  const getContactById = async(contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId)
    return result || null; 
  }
  
  const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId)
    if (idx === -1){
        return null;
    }
    const [result] = contacts.splice(idx,1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return result;
}   
  
  const addContact = async(data) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }


  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  }