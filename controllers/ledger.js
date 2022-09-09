const messages = require('../utils/locale/en');
const repo = require('../db/repository/ledgerOperations');

module.exports = {

    addTransaction(request, response){
        const name = request.params['name'];
        const ledgerObject = request.body;
        ledgerObject['group'] = name;
        //console.log('name ', name);

        console.log('ledger object is ', ledgerObject);
        logger.debug('ledger object is ', ledgerObject);


        repo.add(ledgerObject, name, response);
        // response.json({message:'succeed1!'});

    },

    removeTransaction(request, response){
        const ledgerObject = request.body;
        const name = request.params['name'];
        //console.log('name ', name);
        logger.debug('name ', name);

        //console.log('ledger object is ', ledgerObject);
        logger.debug('ledger object is ', ledgerObject);

        // response.json({message:'succeed2!'});

        repo.remove(ledgerObject, name, response);

    },

    getTransaction(request, response){
        const groupName = request.params['name'];
        //console.log('group is ', groupName);
        logger.debug('group is ', groupName);

        repo.find(groupName, response);
    }

}
