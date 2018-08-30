 'use strict';


var mongoose = require('mongoose'),
Users = mongoose.model('Users'),
Encounters = mongoose.model('Encounters'),
People = mongoose.model('People');
/*
app.route('/user')
    .get(controller.getUser)
    .delete(controller.deleteAccount);
*/
exports.getUser = function(req, res){
    if(!req.body.userId) return res.send({'error': 'Invalid request'});
    Users.findOne({'userId': req.body.userId}, 'userId', function(err, user){
        if(err) res.send(err);
        if(user){
            Encounters.find({userId: req.body.userId}, function(err, allEncounters){
                if (err) return res.send(err);
                if(!allEncounters){
                    allEncounters = [];
                }
                People.find({userId: req.body.userId}, function(err, allPeople){
                    if (err) return res.send(err);
                    if(!allPeople){
                        allPeople = [];
                    }
                    var result = {'encounters': allEncounters, 'people': allPeople,'message': 'retrieved Info'};
                    return res.json(result);
                });
            });
        }else {
            var newUser = new Users(req.body);
            newUser.save(function(err){
                if(err) return res.send(err);
            });
            return res.json({'encounters':[], 'people': [], 'message': 'new account created'})
        }
    });
};

exports.deleteAccount = function(req,res){
    People.remove({userId: req.body.userId},function(err){
        if(err) return res.send({'error': 'account failed to delete'});
        Encounters.remove({userId: req.body.userId},function(err){
            if(err) return res.send({'error': 'account failed to delete'});
            Users.remove({userId: req.body.userId},function(err){
                if(err) return res.send({'error': 'account failed to delete'});
            })
        })
    });
    return res.json({message: 'account has been deleted'});

};

/**
app.route('/person')
    .get(controller.getAllPeople)
    .post(controller.addPeople);
*/
exports.getAllPeople = function(req, res){
    var retrieve = "personId userId lastName firstName frequency"
    People.find({userId: req.body.userId},retrieve, function(err, allPeople){
        if (err) return res.send({'error': 'failed to get information'});
        if(!allPeople){
            allPeople = [];
        }
        return res.json(allPeople);
    });
};

exports.addPeople = function(req, res){

    var peopleReq = req.body.people; //this will be an array
    if(!peopleReq) return res.send({error: 'wrong format'});
    if(peopleReq.length == 0) return res.send({message: 'no people to add'});
    
    for( var i in peopleReq){  
        var person = peopleReq[i];
       // person["frequency"] = parseInt(person["frequency"]);
        var updateError = null;
        console.log(person);
        People.findOneAndUpdate({personId: person.personId, userId: req.body.userId},  {$set: person},
        {upsert: true}, function(err, personsResponse){
            if (err){
                console.log(err);
                return updateError = {'error': 'failed while updating people'};
            }
        });
        if(updateError) return res.send(updateError);
    }
    return res.json({message:"completed adding all people"}); 
};



/**
app.route('/person/:id')
    .get(controller.getPerson)
    .post(controller.updatePerson)
    .delete(controller.deletePerson);
*/
exports.getPerson = function(req, res){
     var retrieve = "personId userId lastName firstName frequency"
    People.findOne({personId: req.params.id, userId: req.body.userId},retrieve,function(err, person){
        if(err) return res.send({'error': 'failed while retrieving person'});
        if(!person) return res.send({'error': 'person doesn\'t exist'});
        return res.json(person);
    });
};

exports.updatePerson = function(req, res){
    People.findOneAndUpdate({personId: req.params.id, userId: req.body.userId}, {$set:req.body.person},{upsert: true}, function(err, person){
        if(err) return res.send({'error': 'failed updating person'});
        return res.json({message:"completed adding person"}); 
    });
    
};

exports.deletePerson = function(req, res){
    People.remove({personId: req.params.id, userId: req.body.userId}, function(err){
        if(err) return res.send({'error': 'account failed to delete'});
       /* person.remove(function(err){
            if(err) return res.send({'error': 'account failed to delete'});
            return res.json({'message': 'person has been deleted'});
        })*/
         return res.json({'message': 'person has been deleted'});
    });
    
}

/**
app.route('/encounters')
    .get(controller.getEncounters)
    .post(controller.addEncounters);
*/

exports.getEncounters = function(req, res){
    var retrieve = "encounterId userId encounterDescription title end start typeofCommunication people";
    Encounters.find({userId: req.body.userId}, retrieve, function(err, allEncounters){
        if (err) return res.send({'error': 'failed to get information'});
        if(!allEncounters){
            allEncounters = [];
        }
        return res.json(allEncounters);
    });
};

exports.addEncounters = function(req, res){
    var encountersReq = req.body.encounters; //this will be an array
    if(!encountersReq) return res.send({error: 'wrong format'});
    if(encountersReq.length == 0) return res.send({message: 'no encounters to add'});
    for( var i in encountersReq){
        var encounter = encountersReq[i];
        Encounters.findOneAndUpdate({encounterId: encounter.encounterId, userId: req.body.userId}, new Encounters(encounter),
        {upsert: true}, function(err, encounterRes){
            if (err) return res.send({'error': 'failed while updating encounters'});
        });
    }
    return res.json({message:"completed adding all encounters"}); 
};

/**
app.route('/encounters/:id')
    .get(controller.getEncounter)
    .put(controller.updateEncounter)
    .delete(controller.deleteEncounter);
};
*/

exports.getEncounter = function(req, res){
    var retrieve = "encounterId userId encounterDescription title end start typeofCommunication people";
    Encounters.findOne({encounterId: req.params.id, userId: req.body.userId},retrieve, function(err, encounter){
        if(err) return res.send({'error': 'failed while retrieving encounter'});
        if(!encounter) return res.send({'error': 'encounter doesn\'t exist'});
        return res.json(encounter);
    });
};

exports.updateEncounter = function(req, res){
    Encounters.findOneAndUpdate({encounterId: req.params.id, userId: req.body.userId}, {$set:req.body.encounter},{upsert: true}, function(err, encounter){
        if(err) return res.send({'error': 'failed updating encounter'});
        return res.json({message:"completed updating encounter"}); 
    });
    
};

exports.deleteEncounter = function(req, res){
    Encounters.remove({encounterId: req.params.id, userId: req.body.userId}, function(err){
        if(err) return res.send({'error': 'encounter failed to delete'});
         return res.json({'message': 'encounter has been deleted'});
    });
   
}
















