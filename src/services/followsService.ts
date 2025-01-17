import * as followsRepository from "../repositories/followsRepository";

export async function follow(followingId: number, followerId: number) {
  return await followsRepository.followUser(followingId, followerId);
}

export async function existingFollow(followingId: number, followerId: number) {
  return await followsRepository.existingFollow(followingId, followerId);
}

export async function followerExists(followerId: number) {
  return await followsRepository.followerExists(followerId);
}
export async function followingExists(followingId: number) {
  return await followsRepository.followingExists(followingId);
}

export async function unFollow(followingId: number, followerId: number) {
  return await followsRepository.Unfolow(followingId, followerId);
} 

export async function getFollowers(userId: number) {
  return await followsRepository.getFollowers(userId);
}
export async function getFollowing(userId: number) {
  return await followsRepository.getFollowing(userId);
}


// export async function toggleFollow(followingId: number, followerId: number) {
//   return await followsRepository.toggleFollow(followingId, followerId);
// }