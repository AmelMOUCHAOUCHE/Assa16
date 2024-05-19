public with sharing class ContactController {
    @AuraEnabled
    public static Id createContact(String civilite, String nom, String prenom, String email) {
        // Créez un nouvel objet Contact avec les valeurs fournies
        Contact newContact = new Contact();
        newContact.FirstName = prenom;
        newContact.LastName = nom;
        newContact.Email = email;
        newContact.Title = civilite;

        // Insérez le nouveau contact dans la base de données
        insert newContact;

        // Renvoie l'ID du contact nouvellement créé
        return newContact.Id;
    }
}

