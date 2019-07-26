module.exports = {
    posts: async function(req, res) {

        //Solution 1: Original function
        try {
            const posts = await Post.find()
            res.send(posts)
        } catch (err) {
            res.serverError(err.toString())
        }

        //Solution 2: Sails waterline function
        // Post.find().exec(function(err, posts) {
        //     if(err) {
        //         return res.serverError(err.toString())
        //     }
        //     res.send(posts)
        // })
    },

    findById: function(req, res) {
        const postId = req.param('postId')

        Post.findOne({id: postId}).exec(function(err, post) {
            if(err) {
                return res.serverError(err.toString())
            }
            if(!post) {
                res.send("Could not find post id = " + postId)
            }else {
                res.send(post)
            }
        })
    },

    create: function(req, res) {
        const title = req.body.title
        const postBody = req.body.postBody

        sails.log.debug('My title: ' + title)
        sails.log.debug('Body: ' + postBody)
        
        Post.create({title: title, body: postBody}).exec(function(err) {
            if(err) {
                return res.serverError(err.toString())
            }
            console.log("Finished creating post object")
            return res.end()
        })
    },

    delete: async function(req, res) {
        const postId = req.param('postId')

        await Post.destroy({id: postId})
        res.send("Finished deleting post")
        // res.send(this.posts)
    }
}