module.exports = {
    emails: function(req, res) {
        Email.find().exec(function(err, emails) {
            if(err) {
                return res.serverError(err.toString())
            }
            res.send(emails)
        })
    },

    findByFrom: function(req, res) {
        const fromEmail = req.param('emailFrom')
        sails.log.debug("from Email: " + fromEmail)

        Email.find({from: fromEmail}).exec(function(err, emails) {
            if(err) {
                return res.serverError(err.toString())
            }
            if(!emails) {
                res.send("Could not find email from = " + fromEmail)
            }else {
                res.send(emails)
            }
        })
    },

    findByTo: function(req, res) {
        const toEmail = req.param('emailTo')
        sails.log.debug("to Email: " + toEmail)

        Email.find({to: toEmail}).exec(function(err, emails) {
            if(err) {
                return res.serverError(err.toString())
            }
            if(!emails) {
                res.send("Could not find email to = " + fromEmail)
            }else {
                res.send(emails)
            }
        })
    },

    create: function(req, res) {
        const from = req.body.from
        const to = req.body.to
        const title = req.body.title
        const emailBody = req.body.emailBody

        Email.create({from: from, to: to, title: title, body: emailBody}).exec(function(err) {
            if(err) {
                return res.serverError(err.toString())
            }
            console.log("Finished creating email object")
            return res.end()
        })
    },

    delete: async function(req, res) {
        const emailId = req.param('emailId')

        await Email.destroy({id: emailId})
        res.send("Finished deleting email")
    },

    archiveById: function(req, res) {
        const emailId = req.param('emailId')
        sails.log.debug("email id: " + emailId)

        Email.archiveOne({id: emailId}).exec(function(err){
            if(err) {
                return res.serverError(err.toString())
            }
            console.log("Finished archiving email object")
            return res.end()
        })
    },

    findArchiveEmails: async function(req, res) {
        res.send(await Archive.find({fromModel: 'email'}))
    }
}