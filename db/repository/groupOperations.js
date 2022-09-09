const GroupModel = require('../models/group').GroupModel;

module.exports = {

    add(groupObject, response){
        // var promise = GroupModel.create(groupObject);
        // return promise;

        GroupModel.create(groupObject, (err, doc) => {
            if(err){
                response.status(500).json({message:'Some DB Error  '});
            }else if(doc){
                response.status(200).json({message:'SignIn'});
            }else{
                response.status(403).json({message:'Error in group creation'});
            }
        })
    },

    find(groupName, response){
        GroupModel.findOne({name:groupName},(err, doc)=>{
            if(err){
                response.status(500).json({message:'Some DB Error  '});
            }
            else if(doc){
                const members = doc.members;
                response.status(200).json({message:'DataObject: ', members});
            }
            else{
                response.status(404).json({message:'Invalid Group name or Password'});
            }
        })

        // GroupModel.findOne({name:groupObject.name}).populate('transactions').exec((err, group) => {
        //     if(err){
        //         response.json({message:'Some DB Error  '});
        //     }else if(group){
        //         const transactions = group['transactions'];
        //         response.json({message:'Group Object: ', transactions});
        //         //console.log(group.transactions);
        //     }else{
        //         response.json({message:'Invalid Group name or Password'});
        //     }
        // })
    },

    update(memberObject, name, response){
        GroupModel.findOneAndUpdate({name:name}, {$push:{members:memberObject.new_member}}, (err, doc)=>{
            if(err){
                response.status(500).json({message:'Some DB Error  '});
            }
            else if(doc){
                response.status(200).json({message:'Updated successfully '});
            }else{
                response.status(404).json({message:'Invalid Group name or Password'});
            }
        });
    },

    remove(groupObject, response){
        GroupModel.findOneAndDelete({name:groupObject.name, password:groupObject.password},(err, doc)=>{
            if(err){
                response.status(500).json({message:'Some DB Error  '});
            }
            else if(doc){
                response.status(200).json({message:groupObject.name + ' deleted'});
            }
            else{
                response.status(404).json({message:'Invalid Group Name or Password'});
            }
        })
    },

    async login(groupObject){
        // GroupModel.findOne(({name:groupObject.name, password:groupObject.password},(err)=>{
        //     if(err){
        //         response.status(404).json({message:'Invalid Group Name or Password'});
        //     }
        //     else{
        //         const group_name = groupObject.name;
        //         //console.log(group_name);
        //         response.status(200).json({message:'Logged in ',group_name});
        //     }
        // }))

        const doc = await GroupModel.findOne({name:groupObject.name, password:groupObject.password}).exec();
        return doc;
    }
}