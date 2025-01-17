import prisma from "../libs/prisma";

// export const toggleFollow = async (followingId: number, followerId: number) => {
//   const existingFollow = await prisma.follows.findFirst({
//     where: {
//       followerId: followerId,
//       followingId: followingId,
//     },
//   });

//   if (existingFollow) {
//     await prisma.follows.delete({
//       where: {
//         id: existingFollow.id,
//       },
//     });
//     return { isFollowing: false };
//   } else {
//     await prisma.follows.create({
//       data: {
//         followerId,
//         followingId,
//       },
//     });
//     return { isFollowing: true };
//   }
// };

export const followUser = async (followingId: number, followerId: number) => {
  return await prisma.follows.create({
    data: {
      followerId,
      followingId,
    },
  });
};

export const existingFollow = async (
  followingId: number,
  followerId: number
) => {
  return await prisma.follows.findFirst({
    where: {
      followerId,
      followingId,
    },
  });
};

export const followerExists = async (followerId: number) => {
  return await prisma.user.findUnique({
    where: {
      id: followerId,
    },
  });
};
export const followingExists = async (followingId: number) => {
  return await prisma.user.findUnique({
    where: {
      id: followingId,
    },
  });
};

export const Unfolow = async (followingId: number, followerId: number) => {
  return await prisma.follows.deleteMany({
    where: { followerId, followingId },
  });
};
export const getFollowers = async (userId: number) => {
  return await prisma.follows.findMany({
    where: { followingId: Number(userId) },
    include: {
      follower: {
        select: {
          id: true,
          fullName: true,
          userName: true,
          Profile: {
            select: {
              avatar: true,
            },
          },
          _count: true,
        },
      },
    },
  });
};

export const getFollowing = async (userId: number) => {
  return await prisma.follows.findMany({
    where: { followerId: Number(userId) },
    include: {
      following: {
        select: {
          id: true,
          fullName: true,
          userName: true,
          Profile: {
            select: {
              avatar: true,
            },
          },
          _count: true,
        },
      },
    },
  });
};
