

'use strict';
module.exports = function(app) {
  var controller = require('../controllers/controller.js');

  // stayInTouch Routes
app.route('/').get(function(req,res){
    res.render('index',
  { title : 'Home' }
  );
});
app.route('/user')
    .post(controller.getUser)
    .delete(controller.deleteAccount);

app.route('/updatePeople')
    .post(controller.addPeople);

app.route('/getPeople')
    .post(controller.getAllPeople);

app.route('/getPerson/:id')
    .post(controller.getPerson);

app.route('/person/:id')
    .post(controller.updatePerson)
    .delete(controller.deletePerson);

app.route('/encounters')
    .post(controller.getEncounters);

app.route('/addEncounters')
    .post(controller.addEncounters);

app.route('/getEncounter/:id')
    .post(controller.getEncounter)

app.route('/encounters/:id')
    .post(controller.updateEncounter)
    .delete(controller.deleteEncounter);   
};








