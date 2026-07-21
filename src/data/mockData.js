export const mockUsers = [
  {
    id: '1',
    username: 'alex_photo',
    fullName: 'Alex Johnson',
    email: 'alex@xgram.com',
    password: 'password123',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=833AB4&color=fff&size=150',
    bio: '📸 Photographer | 🌍 Traveler | Capturing life one shot at a time',
    website: 'https://alexphoto.com',
    followersCount: 12400,
    followingCount: 843,
    postsCount: 234,
    isVerified: true,
    isAdmin: false,
    isPrivate: false
  },
  {
    id: '2',
    username: 'sara_creates',
    fullName: 'Sara Williams',
    email: 'sara@xgram.com',
    password: 'password123',
    avatar: 'https://ui-avatars.com/api/?name=Sara+Williams&background=E1306C&color=fff&size=150',
    bio: '🎨 Digital Artist | UI/UX Designer | Coffee addict ☕',
    website: 'https://saracreates.io',
    followersCount: 8900,
    followingCount: 512,
    postsCount: 189,
    isVerified: false,
    isAdmin: false,
    isPrivate: false
  },
  {
    id: '3',
    username: 'mike_travels',
    fullName: 'Mike Chen',
    email: 'mike@xgram.com',
    password: 'password123',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=F77737&color=fff&size=150',
    bio: '✈️ 50+ countries | 📷 Travel photography | Living the dream',
    website: '',
    followersCount: 34200,
    followingCount: 1200,
    postsCount: 567,
    isVerified: true,
    isAdmin: false,
    isPrivate: false
  },
  {
    id: '4',
    username: 'luna_style',
    fullName: 'Luna Martinez',
    email: 'luna@xgram.com',
    password: 'password123',
    avatar: 'https://ui-avatars.com/api/?name=Luna+Martinez&background=6B48FF&color=fff&size=150',
    bio: '👗 Fashion & Lifestyle | Brand Collab: luna@style.com',
    website: 'https://lunastyle.com',
    followersCount: 56700,
    followingCount: 890,
    postsCount: 312,
    isVerified: true,
    isAdmin: false,
    isPrivate: false
  },
  {
    id: '5',
    username: 'admin_xgram',
    fullName: 'XGram Admin',
    email: 'admin@xgram.com',
    password: 'admin123',
    avatar: 'https://ui-avatars.com/api/?name=XGram+Admin&background=000&color=fff&size=150',
    bio: 'XGram Official Admin Account',
    website: '',
    followersCount: 100000,
    followingCount: 0,
    postsCount: 0,
    isVerified: true,
    isAdmin: true,
    isPrivate: false
  }
]

export const mockPosts = [
  {
    id: 'p1',
    userId: '1',
    user: mockUsers[0],
    mediaUrls: ['https://picsum.photos/seed/xgram1/600/600'],
    mediaType: 'image',
    caption: 'Golden hour magic 🌅 Nothing beats this view after a long hike! #photography #nature #goldenhour #travel',
    location: 'Santorini, Greece',
    likeCount: 1243,
    commentCount: 87,
    savesCount: 342,
    liked: false,
    saved: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'p2',
    userId: '2',
    user: mockUsers[1],
    mediaUrls: ['https://picsum.photos/seed/xgram2/600/600'],
    mediaType: 'image',
    caption: 'New digital art piece dropping soon 🎨✨ Can you guess the theme? #digitalart #design #illustration #art',
    location: 'Studio, New York',
    likeCount: 892,
    commentCount: 54,
    savesCount: 201,
    liked: true,
    saved: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'p3',
    userId: '3',
    user: mockUsers[2],
    mediaUrls: ['https://picsum.photos/seed/xgram3/600/600'],
    mediaType: 'image',
    caption: 'Street food in Bangkok 🍜 The colors, the smells, the people — this city never disappoints! #travel #bangkok #foodie #streetfood',
    location: 'Bangkok, Thailand',
    likeCount: 2341,
    commentCount: 134,
    savesCount: 567,
    liked: false,
    saved: true,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'p4',
    userId: '4',
    user: mockUsers[3],
    mediaUrls: ['https://picsum.photos/seed/xgram4/600/600'],
    mediaType: 'image',
    caption: 'OOTD: Keeping it casual yet chic 💫 Full look linked in bio! #fashion #style #ootd #lifestyle',
    location: 'Milan, Italy',
    likeCount: 4521,
    commentCount: 213,
    savesCount: 1023,
    liked: true,
    saved: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'p5',
    userId: '1',
    user: mockUsers[0],
    mediaUrls: ['https://picsum.photos/seed/xgram5/600/600', 'https://picsum.photos/seed/xgram6/600/600', 'https://picsum.photos/seed/xgram7/600/600'],
    mediaType: 'carousel',
    caption: 'Tokyo at night is something else 🗼🌃 Swipe to see all the shots! #tokyo #japan #nightphotography #travel',
    location: 'Tokyo, Japan',
    likeCount: 3102,
    commentCount: 178,
    savesCount: 890,
    liked: false,
    saved: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
]

export const mockStories = [
  { id: 's1', userId: '2', user: mockUsers[1], mediaUrl: 'https://picsum.photos/seed/story1/400/700', mediaType: 'image', seen: false, expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString() },
  { id: 's2', userId: '3', user: mockUsers[2], mediaUrl: 'https://picsum.photos/seed/story2/400/700', mediaType: 'image', seen: false, expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString() },
  { id: 's3', userId: '4', user: mockUsers[3], mediaUrl: 'https://picsum.photos/seed/story3/400/700', mediaType: 'image', seen: true, expiresAt: new Date(Date.now() + 15 * 60 * 60 * 1000).toISOString() },
  { id: 's4', userId: '1', user: mockUsers[0], mediaUrl: 'https://picsum.photos/seed/story4/400/700', mediaType: 'image', seen: false, expiresAt: new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString() }
]

export const mockReels = [
  {
    id: 'r1',
    userId: '3',
    user: mockUsers[2],
    thumbnailUrl: 'https://picsum.photos/seed/reel1/400/700',
    caption: 'Bali sunrise 🌅 #travel #bali #reels',
    audioTrack: 'Somewhere Over The Rainbow',
    audioArtist: 'Israel Kamakawiwoʻole',
    viewCount: 45200,
    likeCount: 3421,
    commentCount: 234,
    liked: false
  },
  {
    id: 'r2',
    userId: '2',
    user: mockUsers[1],
    thumbnailUrl: 'https://picsum.photos/seed/reel2/400/700',
    caption: 'Speed art process 🎨 #digitalart #timelapse #art',
    audioTrack: 'Lo-fi beats',
    audioArtist: 'ChillHop',
    viewCount: 28900,
    likeCount: 2100,
    commentCount: 145,
    liked: true
  },
  {
    id: 'r3',
    userId: '4',
    user: mockUsers[3],
    thumbnailUrl: 'https://picsum.photos/seed/reel3/400/700',
    caption: 'GRWM for a night out ✨ #fashion #grwm #style',
    audioTrack: 'Levitating',
    audioArtist: 'Dua Lipa',
    viewCount: 89100,
    likeCount: 7800,
    commentCount: 567,
    liked: false
  },
  {
    id: 'r4',
    userId: '1',
    user: mockUsers[0],
    thumbnailUrl: 'https://picsum.photos/seed/reel4/400/700',
    caption: 'Milky way timelapse 🌌 #astro #photography #space',
    audioTrack: 'Interstellar Theme',
    audioArtist: 'Hans Zimmer',
    viewCount: 112000,
    likeCount: 9200,
    commentCount: 678,
    liked: false
  }
]

export const mockComments = [
  { id: 'c1', postId: 'p1', userId: '2', user: mockUsers[1], text: 'This is absolutely stunning! 😍', likeCount: 45, createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
  { id: 'c2', postId: 'p1', userId: '3', user: mockUsers[2], text: 'I need to visit Santorini ASAP!', likeCount: 23, createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString() },
  { id: 'c3', postId: 'p1', userId: '4', user: mockUsers[3], text: 'The colors in this shot are unreal 🔥', likeCount: 67, createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString() }
]

export const mockConversations = [
  {
    id: 'conv1',
    type: 'direct',
    participant: mockUsers[1],
    lastMessage: 'Love that last photo! 😍',
    lastMessageTime: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    unread: 2
  },
  {
    id: 'conv2',
    type: 'direct',
    participant: mockUsers[2],
    lastMessage: 'Are you going to the event?',
    lastMessageTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    unread: 0
  },
  {
    id: 'conv3',
    type: 'direct',
    participant: mockUsers[3],
    lastMessage: 'Check out my new post!',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    unread: 1
  }
]

export const mockMessages = {
  conv1: [
    { id: 'm1', senderId: '2', text: 'Hey! How are you?', createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString() },
    { id: 'm2', senderId: '1', text: "I'm great! Just got back from shooting in Santorini!", createdAt: new Date(Date.now() - 55 * 60 * 1000).toISOString() },
    { id: 'm3', senderId: '2', text: 'No way! That sounds amazing 😍', createdAt: new Date(Date.now() - 50 * 60 * 1000).toISOString() },
    { id: 'm4', senderId: '1', text: 'It was incredible. The light there is just magical!', createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString() },
    { id: 'm5', senderId: '2', text: 'Love that last photo! 😍', createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString() }
  ]
}

export const mockNotifications = [
  { id: 'n1', type: 'like', actorId: '2', actor: mockUsers[1], text: 'liked your photo.', postId: 'p1', postThumb: 'https://picsum.photos/seed/xgram1/100/100', createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), isRead: false },
  { id: 'n2', type: 'comment', actorId: '3', actor: mockUsers[2], text: 'commented: "This is absolutely stunning!"', postId: 'p1', postThumb: 'https://picsum.photos/seed/xgram1/100/100', createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), isRead: false },
  { id: 'n3', type: 'follow', actorId: '4', actor: mockUsers[3], text: 'started following you.', createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), isRead: true },
  { id: 'n4', type: 'like', actorId: '3', actor: mockUsers[2], text: 'liked your reel.', reelId: 'r4', postThumb: 'https://picsum.photos/seed/reel4/100/100', createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), isRead: true },
  { id: 'n5', type: 'mention', actorId: '2', actor: mockUsers[1], text: 'mentioned you in a comment.', postId: 'p2', postThumb: 'https://picsum.photos/seed/xgram2/100/100', createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), isRead: true }
]

export const mockHashtags = [
  { id: 'h1', tag: 'photography', postCount: 12400000 },
  { id: 'h2', tag: 'travel', postCount: 8900000 },
  { id: 'h3', tag: 'nature', postCount: 6700000 },
  { id: 'h4', tag: 'art', postCount: 4500000 },
  { id: 'h5', tag: 'fashion', postCount: 11200000 },
  { id: 'h6', tag: 'food', postCount: 9800000 },
  { id: 'h7', tag: 'reels', postCount: 3400000 },
  { id: 'h8', tag: 'digitalart', postCount: 2100000 }
]

export const mockHighlights = [
  { id: 'hl1', userId: '1', title: 'Greece', coverUrl: 'https://picsum.photos/seed/hl1/100/100' },
  { id: 'hl2', userId: '1', title: 'Japan', coverUrl: 'https://picsum.photos/seed/hl2/100/100' },
  { id: 'hl3', userId: '1', title: 'Nature', coverUrl: 'https://picsum.photos/seed/hl3/100/100' },
  { id: 'hl4', userId: '1', title: 'Urban', coverUrl: 'https://picsum.photos/seed/hl4/100/100' }
]

export const mockExploreGrid = [
  ...mockPosts,
  { id: 'e1', mediaUrls: ['https://picsum.photos/seed/exp1/400/400'], mediaType: 'image', likeCount: 3421, commentCount: 123, user: mockUsers[0] },
  { id: 'e2', mediaUrls: ['https://picsum.photos/seed/exp2/400/400'], mediaType: 'image', likeCount: 892, commentCount: 44, user: mockUsers[1] },
  { id: 'e3', mediaUrls: ['https://picsum.photos/seed/exp3/400/400'], mediaType: 'image', likeCount: 5671, commentCount: 234, user: mockUsers[2] },
  { id: 'e4', mediaUrls: ['https://picsum.photos/seed/exp4/400/400'], mediaType: 'image', likeCount: 1203, commentCount: 67, user: mockUsers[3] },
  { id: 'e5', mediaUrls: ['https://picsum.photos/seed/exp5/400/400'], mediaType: 'image', likeCount: 7823, commentCount: 445, user: mockUsers[0] },
  { id: 'e6', mediaUrls: ['https://picsum.photos/seed/exp6/400/400'], mediaType: 'image', likeCount: 2341, commentCount: 89, user: mockUsers[1] },
  { id: 'e7', mediaUrls: ['https://picsum.photos/seed/exp7/400/400'], mediaType: 'image', likeCount: 9012, commentCount: 567, user: mockUsers[2] }
]
