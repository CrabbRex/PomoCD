export type Playlist = {
    id: string;
    name: string;
    description: string;

    artist: string;
    album: string;
};

export const playlists: Playlist[] = [
    {
        id: 'PLGVZe8tVzNTmuGVsoHjphFz7wBYmd5DVD',
        name: 'You Seem So Pretty For A Girl So In Love',
        description: 'Newest Album',
        artist: 'Olivia Rodrigo',
        album: 'you seem pretty sad for a girl so in love'
    },
    {
        id: 'PLDhajrZgo0TIE8ERpzB62xC01fhZv4Vmx',
        name: 'Bewitched: The Goddess Edition',
        description: 'Laufey',
        artist: 'Laufey',
        album: 'Bewitched'
    },
    {
        id: 'PLxA687tYuMWjmOW3x8W49Z4sCgzVNkNVl',
        name: 'The Art of Living',
        description: '',
        artist: 'Olivia Dean',
        album: 'The Art Of Loving'
    },
    {
        id: 'PLC6eRc7xWgt1mDbMyU3jOETajIeymUsNS',
        name: 'Panchiko: DEATHMETAL',
        description: '',
        artist: 'Panchiko',
        album: 'DEATHMETAL'
    },
    {
        id: 'PLwuiYuI6Xvg97bck_3LdCPmq9x3TapoLx',
        name: 'irvi: The Theory Of You',
        description: '',
        artist: 'irvi',
        album: 'The Theory Of You'
    },
    {
        id: 'PLKDOdCjxOjzIFucHobwJpSK4-vAVXST90',
        name: 'Stardew Valley OST',
        description: '',
        artist: 'ConcernedApe',
        album: 'Stardew Valley OST'
    },
    {
        id: 'PLJCpt1SabSbI_UGlns77T75Nsbr-iTMdq',
        name: 'Persona 5 OST',
        description: 'Original soundtracks from the game Persona 5',
        artist: '',
        album: 'Persona 5'
    },
];