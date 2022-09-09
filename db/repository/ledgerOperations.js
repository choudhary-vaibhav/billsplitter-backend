const LedgerModel = require('../models/ledger').LedgerModel;
const GroupModel = require('../models/group').GroupModel;

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
                        console.log('Some DB Error 2 ');
                    }else if(doc){
                        response.json({message:'Transaction successfully added '});
                        console.log('Transaction successfully added ');
                    }else{
                        response.json({message:'Problem in transaction addition'});
                        console.log('Problem in transaction addition2');
                    }
                })
            }else{
                response.json({message:'Problem in transaction addition'});
                console.log('Problem in transaction addition1');
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
    },

    find(groupName, response){
        GroupModel.findOne({name:groupName}).populate('transactions').exec((err, group) => {
            if(err){
                response.json({message:'Some DB Error  '});
            }else if(group){
                const transactions = group['transactions'];
                response.json({message:'Group Object: ', transactions});
                //console.log(group.transactions);
            }else{
                response.json({message:'Invalid Group name or Password'});
            }
        })
    }
}