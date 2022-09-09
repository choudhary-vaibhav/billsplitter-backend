const LedgerModel = require('../models/ledger').LedgerModel;
const GroupModel = require('../models/group').GroupModel;

module.exports = {

    add(ledgerObject, name, response){
        // var promise = LedgerModel.create(ledgerObject);
        // return promise;

        LedgerModel.create(ledgerObject,(err,doc)=>{
            if(err){
                response.status(500).json({message:'Some DB Error 1 '});
            }else if(doc){

                GroupModel.findOneAndUpdate({name:name}, {$push:{transactions:doc._id}}, (err, doc) => {
                    if(err){
                        response.status(500).json({message:'Some DB Error 2 '});
                        //console.log('Some DB Error 2 ');
                    }else if(doc){
                        response.status(200).json({message:'Transaction successfully added '});
                        //console.log('Transaction successfully added ');
                    }else{
                        response.status(404).json({message:'Error in group name'});
                        //console.log('Error in group name');
                    }
                })
            }else{
                response.status(500).json({message:'Problem in transaction addition'});
                //console.log('Problem in transaction addition1');
            }
        })
    },

    remove(ledgerObject, name, response){
        LedgerModel.findOneAndDelete({_id:ledgerObject._id},(err, doc)=>{
            if(err){
                response.status(500).json({message:'Some DB Error  '});
            }
            else if(doc){
                GroupModel.findOneAndUpdate({name:name}, {$pull:{transactions:doc._id}}, (err, doc) => {
                    if(err){
                        response.status(500).json({message:'Some DB Error 2 '});
                    }else if(doc){
                        response.status(200).json({message:'Transaction data removed'});
                    }else{
                        response.status(404).json({message:'Error in Group Name '});
                    }
                })
                
            }
            else{
                response.status(500).json({message:'Invalid Ledger Data '});
            }
        })
    },

    find(groupName, response){
        GroupModel.findOne({name:groupName}).populate('transactions').exec((err, group) => {
            if(err){
                response.status(500).json({message:'Some DB Error  '});
            }else if(group){
                const transactions = group['transactions'];
                response.status(200).json({message:'Group Object: ', transactions});
                //console.log(group.transactions);
            }else{
                response.status(404).json({message:'Invalid Group name or Password'});
            }
        })
    }
}