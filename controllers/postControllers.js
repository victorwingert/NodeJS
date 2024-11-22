const Post = require('../models/Post');
const { post } = require('../routes/postRoutes');

exports.getAllPosts = async (req, res, next) => {
    try {
        const [posts, _] = await Post.findAll();

        res.status(200).json({ count: posts.length, posts });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.createNewPost = async (req, res, next) => {
    try {
        let { title, body, created_at } = req.body;
        let post = new Post(title, body, created_at);

        post = await post.save();

        res.status(201).json({ message: "Post created " });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getPostById = async (req, res, next) => {
    try {
        let postId = req.params.id;
        let [post, _] = await Post.findById(postId);

        res.status(200).json({ post: post[0] });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        let postId = req.params.id;
        const { title, body, created_at } = req.body;

        await Post.updateById(postId, title, body, created_at);

        res.status(200).json({ message: "Post updated " });
    } catch (error) {
        console.log(error);
        next(error);
    }
}
