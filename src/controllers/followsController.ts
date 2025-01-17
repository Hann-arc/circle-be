import { Request, Response } from "express";
import * as followService from "../services/followsService";

export const toggleFollow = async (
  req: Request,
  res: Response
)=> {
  const { followingId } = req.body;

  const followerId = res.locals.user.id;

  if (!followingId) {
    res.status(400).json({ message: "following id is missing" });
  }

  if (!followerId) {
    res.status(400).json({ messgae: "Unauthorized" });
    return;
  }

  if (followerId === followingId) {
    res.status(400).json({ message: "You cannot follow yourself!" });
    return;
  }

  try {

    const existedFollower = await followService.followerExists(followerId)
    const existedFollowing = await followService.followingExists(followingId)

    if (!existedFollower || !existedFollowing) {
      res.status(400).json({ messgae: "Follower or Following user does not exist" });
      return; 
    }

    const existingFollow  = await followService.existingFollow(followingId, followerId)

    if(!existingFollow){
      const follow = await followService.follow(followingId, followerId)

      res.status(200).json({follow, message: "berhasil follow"})
      return 
    }

    const unFollow =  await followService.unFollow(followingId, followerId) 

    
    res.status(200).json({unFollow, message: "berhasil unfollow"})
    return

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getFollowers = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ message: "User Id not definded" });
  }
  try {
    const followers = await followService.getFollowers(parseInt(userId));
    // const totalFollowers = followers.length;

    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
  
};

export const getFollowing = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ message: "User Id not difinded" });
  }
  try {
    const following = await followService.getFollowing(parseInt(userId));
    // const totalFollowing = following.length

    res.status(200).json(following);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
};
