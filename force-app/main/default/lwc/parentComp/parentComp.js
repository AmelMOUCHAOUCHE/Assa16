import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createContact from '@salesforce/apex/ContactController.createContact';

export default class ParentComp extends LightningElement {
    @track selectedType = '';
    @track distributorId = '';
    @track showHelloWorld = true;
    @track showDistributeur = false;
    @track showSection3 = false;
    @track helloWorldValidated = false;
    @track distributeurValidated = false;
    @track Error = '';
    @track selectedAgenceId;
    @track selectedAgenceName;
    @track nom = '';
    @track prenom = '';
    @track civilite = '';
    @track email = '';
    @track username = '';
    @track produit = '';
    @track showForm = false;

    handleTypeChange(event) {
        this.selectedType = event.detail; // Récupère le type d'utilisateur sélectionné
        this.Error = '';
    }

    lookupUpdatehandler(event) {
        this.distributorId = event.detail; // Récupère l'ID du distributeur
        this.Error = '';
    }

    lookupUpdatehandler(event) {
        this.selectedAgenceId = event.detail;
        this.selectedAgenceName = event.detail;
    }

    handleCancel() {
        this.showForm = false; // On ajoutera une logique revenir à la page de création ou...
    }

    handleSave() {
        // Implémenter la logique pour sauvegarder le formulaire
        this.showForm = false; // Masquer le formulaire après avoir sauvegardé

        // Logique de sauvegarde
        // Appelez la méthode Apex pour créer un nouvel utilisateur
        createContact({ 
            civilite: this.civilite,
            nom: this.nom,           
            prenom: this.prenom,
            email: this.email
        })
        .then(result => {
            // Affichez un message de succès à l'utilisateur
            this.showToast('Success', 'Contact créé avec succès. ID: ' + result, 'success');
            
            // Appel de la méthode pour attribuer les permissions (décommenter si nécessaire)
            // assignPermissionSetLicenses({ userId: result })
            //     .then(() => {
            //         this.showToast('Success', 'Permissions attribuées avec succès.', 'success');
            //     })
            //     .catch(error => {
            //         this.showToast('Error', 'Erreur lors de l\'attribution des permissions: ' + error.body.message, 'error');
            //     });
        })
        .catch(error => {
            // Affichez un message d'erreur à l'utilisateur
            this.showToast('Error', 'Erreur lors de la création du contact: ' + error.body.message, 'error');
            console.error('Erreur lors de la création du contact : ', error);
        });
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

    handleNomUpdate(event) {
        this.nom = event.detail.value;
    }

    handlePrenomUpdate(event) {
        this.prenom = event.detail.value;
    }

    handleCiviliteUpdate(event) {
        this.civilite = event.detail.value;
    }

    handleEmailUpdate(event) {
        this.email = event.detail.value;
    }

    handleUsernameUpdate(event) {
        this.username = event.detail.value;
    }

    handleProduitUpdate(event) {
        this.produit = event.detail.value;
    }
}
