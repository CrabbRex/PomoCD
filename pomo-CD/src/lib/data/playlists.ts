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
        id: 'PLJCpt1SabSbI_UGlns77T75Nsbr-iTMdq',
        name: 'Persona 5 OST',
        description: 'Original soundtracks from the game Persona 5',
        artist: '',
        album: 'Persona 5'
    },
    {
        id: 'PLDhajrZgo0TIE8ERpzB62xC01fhZv4Vmx',
        name: 'Bewitched: The Goddess Edition',
        description: 'Laufey',
        artist: 'Laufey',
        album: 'Bewitched'
    },
];