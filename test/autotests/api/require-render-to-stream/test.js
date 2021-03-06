var nodePath = require('path');
var through = require('through');

exports.check = function(marko, markoCompiler, expect, done) {
    var output = '';
    var outStream = through(function write(data) {
        output += data;
    });

    outStream.on('end', function() {
        expect(output).to.equal('Hello John!');
        done();
    });


    var template = require(nodePath.join(__dirname, 'template.marko'));
    template.stream(
        {
            name: 'John'
        })
        .pipe(outStream)
        .on('error', function(e) {
            done(e);
        });
};