const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');
const contactsPath = path.join('db', 'contacts.json');
 async function listContacts() {
try {
const readList = await fs.readFile(contactsPath);
const contacts = JSON.parse(readList.toString());
console.log(contacts);
return contacts;
} 
catch (err) {
console.log(err)
}
  }

   async function getContactById(contactId) {
    try {
        const readList = await fs.readFile(contactsPath);
        const contacts = JSON.parse(readList.toString());
        const contact = contacts.find((c) => c.id === contactId);
        if (!contact) {
            console.log(null);
            return null;
          }
      
          console.log(contact);
          return contact;
        } 
        catch (err) {
            console.log(err);
        }
    
  }
  
  async function removeContact(contactId) {
    try {
        const readList = await fs.readFile(contactsPath);
        const contacts = JSON.parse(readList.toString());
        const contactIndex = contacts.findIndex((c) => c.id === contactId);
        if (contactIndex !== -1) {
            const removedContact = contacts.splice(contactIndex, 1);
            await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
console.log(removedContact[0]);
            return removedContact[0];
          } else {
            console.log(null);
            return null;
          }
        } 
        catch (err) {
        console.log(err)
        }
  }
  
  async function addContact(name, email, phone) {
      try{const readList = await fs.readFile(contactsPath);
        const contacts = JSON.parse(readList.toString());
        const newContact = {
        id: nanoid(),
          name,
          email,
          phone,
        };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        console.log(newContact);
        return newContact; }  
        catch (err) {
            console.error(err);
    return null;
        }
  }
  module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
  };