#!/usr/bin/env node
var util = require('util'),
	ElizaBot = require('eliza'),
	fs = require('fs');


var question = '',
	answer = '',
	session = [];

var record = require('/home/papyromancer/.eliza_db.json');

var eliza = new ElizaBot();
var question = eliza.getInitial();
var stdin = process.openStdin();
util.print(question + '\n> ')
stdin.on('data', function (line) {
	answer = line.toString();
	answer = answer.slice(0, answer.length - 1)
	session.push( { 'question': question, 'answer': answer } );
	question = eliza.transform(line.toString());
	if (answer === 'quit') {
		var end = eliza.getFinal();
		session.push( { 'question': end } );
		console.log(end);
		var now = new Date().toISOString();
		record.push({ 'date': now, 'session': session});
		data = JSON.stringify(record, null, '\t').toString()
		fs.writeFile('/home/papyromancer/.eliza_db.json', data, function(err) {
			if(err) {
				console.log(err);
			} else {
				console.log("The file was saved!");
			}
		}, function() {
			process.exit();
		})
	} else {
		util.print(question + '\n> ');
	}
})
