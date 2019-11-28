var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

var params = {};

exports.lambdaHandler = async (event, context) => {
    let instanceIds = [];
    await ec2.describeInstances(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else if (data) {
          for (const reservation of data.Reservations) {
            for (const instance of reservation.Instances) {
              console.log(instance.InstanceId);
              instanceIds.push(instance.InstanceId)
            }
          }
        }
    }).promise();

    return instanceIds;
};
