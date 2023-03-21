import User from "../models/User";

//read

export const getUser= async(req,res)=> {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }catch(err){
        res.status(404).json({message: err.message});
    }
}

export const getUserFriends = async (req,res)=> {
    try{
    const { id } = req.params;
    const user =await User.findById(id);

    const friends = await Promise.all( 
        user.friends.map((id) => User.findById(id))
    );
const formattedFriends = friends.map( 
    ({ _id, firstName,lastName, occupation, location,  picturePath }) => {
    return { _id, firstName,lastName, occupation, location,picturePath };
}
);
res.status(200).json(formattedFriends);
}catch(err){
res.status(404).json({message: err.message});
}
};

//update

export const addRemovefriend =async (req,res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
if(user.friends.includes(friendId)){
    user.friends= user.friends.filter((id) => id !==friendId); //remove  friend from user
    friend.friends=user.friends.filter((id) => id !==friendId);//remove   user from friend
}
else {//add to friend lists user to friend and friend to user
    user.friends.push(friendId); 
    friend.friends.push(id);
}
await user.save();
await friend.save();

const friends = await Promise.all( 
    user.friends.map((id) => User.findById(id))
);
const formattedFriends = friends.map( 
({ _id, firstName,lastName, occupation, location,  picturePath }) => {
return { _id, firstName,lastName, occupation, location,picturePath };
}
);
res.status(200).json(formattedFriends);

    }catch(err){
        res.status(404).json({message: err.message});

    }
}