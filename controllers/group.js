const messages = require('../utils/locale/en');
const repo = require('../db/repository/groupOperations');

module.exports = {

    create(request, response){
        const groupObject = request.body;
        //console.log('group is ', groupObject);
        logger.debug('group is ', groupObject);
        // response.json({message:'succeed1!'});
        
        repo.add(groupObject, response);
        // const result = await repo.add(groupObject);
        // if(result && result.name){
        //     response.json({message:'Group successfully created '});
        // }else{
        //     response.json({message:'Problem in group creation'});
        // }

    },

    deleteGroup(request, response){
        const groupObject = request.body;
        const name = request.params['name'];
        //console.log('group object is ', groupObject);
        logger.debug('group object is ', groupObject);
        //console.log('name is ', name);
        logger.debug('name is ', name);
        
        // response.json({message:'succeed2!'});

        repo.remove(groupObject, response);

    },

    update(request, response){
        const memberObject = request.body;
        if(memberObject['new_member']){
        const name = request.params['name'];
        //console.log('new member is ', memberObject);
        logger.debug('new member is ', memberObject);
        //console.log('name is ', name);
        logger.debug('name is ', name);

        // response.json({message:'succeed3!'});

        repo.update(memberObject, name, response);
        }else{
            response.json({message:'blank value'});
        }
        

    },

    data(request, response){
        const group_name = request.params['name'];
        //console.log('name is ', group_name);
        logger.debug('name is ', group_name);
        // response.json({message:'succeed4!'});

        repo.find(group_name, response);
    },

    login(request, response){
        const groupObject = request.body;
        logger.debug(groupObject);
        //console.log(groupObject);
        repo.login(groupObject, response);
    }
}