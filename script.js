function playTrack(src) {
    const player = document.getElementById("audioPlayer");
    player.src = src;
    player.play();
}


document.querySelectorAll('.track').forEach((track, index) => {
  track.querySelector('.track-number').textContent = index + 1;

  const playButton = track.querySelector('.play-button');
  playButton.addEventListener('click', () => {
    document.querySelectorAll('.track').forEach(t => t.classList.remove('active'));
    track.classList.add('active');
  });
});


const playlists = {
  rap: {
    title: "Rap",
    tracks: [
      { title: "Stronger", artist: "Kanye West", music: 'music/track1.mp3'},
      { title: "Can't Hold Us", artist: "Macklemore & Ryan Lewis", music: 'music/track1.mp3'},
      { title: "Titanium", artist: "David Guetta ft. Sia", music: 'music/track2.mp3'},
      { title: "Fix You", artist: "Coldplay", music: 'music/track2.mp3'},
      { title: "Can't Hold Us", artist: "Macklemore & Ryan Lewis", music: 'music/track1.mp3'},
      { title: "Titanium", artist: "David Guetta ft. Sia", music: 'music/track2.mp3'},
      { title: "Fix You", artist: "Coldplay", music: 'music/track2.mp3'},
      { title: "Can't Hold Us", artist: "Macklemore & Ryan Lewis", music: 'music/track1.mp3'},
      { title: "Titanium", artist: "David Guetta ft. Sia", music: 'music/track2.mp3'},
      { title: "Fix You", artist: "Coldplay", music: 'music/track2.mp3'}
    ]
  },
  jazz: {
    title: "Jazz",
    tracks: [
      { title: "Take Five", artist: "Dave Brubeck", music: 'music/track1.mp3'},
      { title: "So What", artist: "Miles Davis", music: 'music/track2.mp3'},
      { title: "Blue in Green", artist: "Bill Evans", music: 'music/track1.mp3'},
      { title: "Fix You", artist: "Coldplay", music: 'music/track2.mp3'},
      { title: "Fix You", artist: "Coldplay", music: 'music/track2.mp3'}
    ]
  },
    pop: {
    title: "Pop",
    tracks: [
      { title: "Imagine", artist: "John Lennon", music: 'music/track1.mp3'},
      { title: "Yellow", artist: "Coldplay", music: 'music/track2.mp3'},
      { title: "Fix You", artist: "Coldplay", music: 'music/track2.mp3'},
      { title: "Fix You", artist: "Coldplay", music: 'music/track2.mp3'}
    ]
  },
  opera: {
    title: "Opera",
    tracks: [
      { title: "Stronger", artist: "Kanye West", music: 'music/track1.mp3'},
      { title: "Can't Hold Us", artist: "Macklemore & Ryan Lewis", music: 'music/track1.mp3'},
      { title: "Titanium", artist: "David Guetta ft. Sia", music: 'music/track2.mp3'},
      { title: "Fix You", artist: "Coldplay", music: 'music/track2.mp3'},
      { title: "Can't Hold Us", artist: "Macklemore & Ryan Lewis", music: 'music/track1.mp3'},
      { title: "Titanium", artist: "David Guetta ft. Sia", music: 'music/track2.mp3'},
      { title: "Fix You", artist: "Coldplay", music: 'music/track2.mp3'},
      { title: "Can't Hold Us", artist: "Macklemore & Ryan Lewis", music: 'music/track1.mp3'},
      { title: "Titanium", artist: "David Guetta ft. Sia", music: 'music/track2.mp3'},
      { title: "Fix You", artist: "Coldplay", music: 'music/track2.mp3'}
    ]
  },
  ballad: {
    title: "Ballad",
    tracks: [
      { title: "Take Five", artist: "Dave Brubeck", music: 'music/track1.mp3'},
      { title: "So What", artist: "Miles Davis", music: 'music/track2.mp3'},
      { title: "Blue in Green", artist: "Bill Evans", music: 'music/track1.mp3'},
      { title: "Fix You", artist: "Coldplay", music: 'music/track2.mp3'},
      { title: "Fix You", artist: "Coldplay", music: 'music/track2.mp3'}
    ]
  },
    rock: {
    title: "Rock",
    tracks: [
      { title: "Take Five", artist: "Dave Brubeck", music: 'music/track1.mp3'},
      { title: "So What", artist: "Miles Davis", music: 'music/track2.mp3'},
      { title: "Blue in Green", artist: "Bill Evans", music: 'music/track1.mp3'},
      { title: "Fix You", artist: "Coldplay", music: 'music/track2.mp3'},
      { title: "Fix You", artist: "Coldplay", music: 'music/track2.mp3'}
    ]
  }
};

document.querySelectorAll('.library-list li').forEach(item => {
  item.addEventListener('click', () => {
    const key = item.getAttribute('data-library');
    const playlist = playlists[key];

    document.getElementById('playlist-title').textContent = playlist.title;

    const container = document.getElementById('playlist-container');
    container.innerHTML = '';

    playlist.tracks.forEach((track, index) => {
      const trackEl = document.createElement('div');
      trackEl.className = 'track';

      trackEl.innerHTML = `
        <button class="play-button" onclick="playTrack('${track.music}')">▶</button>
        <div class="track-number">${index + 1}</div>
        <div class="track-info">
          <h3>${track.title}</h3>
          <p>${track.artist}</p>
        </div>
      `;

      trackEl.querySelector('.play-button').addEventListener('click', () => {
        document.querySelectorAll('.track').forEach(t => t.classList.remove('active'));
        trackEl.classList.add('active');
      });

      container.appendChild(trackEl);
    });

    document.querySelector('.playlist-section').style.display = 'block';
    document.querySelector('.main-section').style.display = 'none';
  });
});


  document.addEventListener('DOMContentLoaded', () => {
    const listItems = document.querySelectorAll('.library-list li');

    listItems.forEach(item => {
      item.addEventListener('click', () => {

        listItems.forEach(li => li.classList.remove('active'));

        item.classList.add('active');
      });
    });
  });
