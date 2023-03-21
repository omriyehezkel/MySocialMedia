import Post from "../models/Post.js";


///creat

export const creatPost = async (req,req) =>{
    try {
        const{ userId,description,picturePath} =req.body;
        const user = await User.findById(userId);
        const newPost = new Post ({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            location: user.location,
            description,
            picturePath, 
            userPicturePath: user.picturePath,
            
            likes:{},
            comments:[]

        })

        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
    }catch (err){
        res.status(409).json({messag: err.message})
    }
}

//read

export const getFeedPosts = async (req,res)=>{
    try{
        const post = await Post.find();
        res.status(200).json(post);

    }catch(err){
        res.status(404).json({messag: err.message})

    }
}

export const getUserPost = async(req,res) => {

    try{
        const { userId} =req.params;
        const post = await Post.find({userId});
        res.status(200).json(post);

    }catch(err){
        res.status(404).json({messag: err.message})

    }
}

//update

export const likePost = async (req,req) => {
 
    try{
        const { id } = req.params;
        const {userId}  =req.body;
        const post = await Post.findById(id);
        const isLike = post.likes.get(userId);

        if ( isLike){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId,true);
        }
        
        const updatedPost = await Post.findByIdAndUpdate(id,{likes: post.likes},{new: true});
         


        res.status(200).json();

    }catch(err){
        res.status(404).json({messag: err.message})

    
}}