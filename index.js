const {program} = require("commander");


const contacts = require('./contacts')

const invokeAction = async ({ action, id, name, email, phone })=> {
    switch (action) {
      case "list":
        const allContacts = await contacts.listContacts()
        return console.log(allContacts)

      case "get":
        const oneContact = await contacts.getContactById(id)
        return console.log(oneContact)
        
      case "add":
        const newContact = await contacts.addContact({name, email, phone});
        console.log(newContact)
  
      case "remove":
        const removeContact = await contacts.removeContact(id)
        return console.log(removeContact)
        
      default:
        console.warn("Unknown action");
    }
  }

program
  .option("-a, --action, <type>")
  .option("-i, --id, <type>")
  .option("-n, --name, <type>")
  .option("-e, --email, <type>")
  .option("-ph, --phone, <type>");


program.parse();

const options = program.opts();
invokeAction(options)

