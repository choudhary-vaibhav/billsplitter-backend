const LedgerModel = require('../models/ledger');
const GroupModel = require('../models/group');

module.exports = {

    add(ledgerObject, name, response){
        // var promise = LedgerModel.create(ledgerObject);
        // return promise;

        LedgerModel.create(ledgerObject,(err,doc)=>{
            if(err){
                response.json({message:'Some DB Error 1 '});
            }else if(doc){

                GroupModel.findOneAndUpdate({name:name}, {$push:{transactions:doc._id}}, (err, doc) => {
                    if(err){
                        response.json({message:'Some DB Error 2 '});
                    }else if(doc){
                        response.json({message:'Transaction successfully added '});
                    }else{
                        response.json({message:'Problem in transaction addition'});
                    }
                })
            }else{
                response.json({message:'Problem in transaction addition'});
            }
        })
    },

    remove(ledgerObject, name, response){
        LedgerModel.findOneAndDelete({_id:ledgerObject._id},(err, doc)=>{
            if(err){
                response.json({message:'Some DB Error  '});
            }
            else if(doc){
                GroupModel.findOneAndUpdate({name:name}, {$pull:{transactions:doc._id}}, (err, doc) => {
                    if(err){
                        response.json({message:'Some DB Error 2 '});
                    }else if(doc){
                        response.json({message:'Transaction data removed'});
                    }else{
                        response.json({message:'Error in Group Name '});
                    }
                })
                
            }
            else{
                response.json({message:'Invalid Ledger Data '});
            }
        })
    }
}