const playlists = {
  P1: {
    title: "Rap",
    cover: "pic/playlist1.png",
    tracks: [
      { id: "Rap1", title: "Stronger", artist: "Kanye West", music: 'music/track1.mp3'},
      { id: "Rap2", title: "Can't Hold Us", artist: "Macklemore & Ryan Lewis", music: 'music/track1.mp3'},
      { id: "Rap3", title: "Titanium", artist: "David Guetta ft. Sia", music: 'music/track2.mp3'}
    ]
  },
  P2: {
    title: "Jazz",
    cover: "pic/playlist2.png",
    tracks: [
      { id: "Jazz1", title: "Take Five", artist: "Dave Brubeck", music: 'music/track1.mp3'},
      { id: "Jazz2", title: "So What", artist: "Miles Davis", music: 'music/track2.mp3'},
      { id: "Jazz3", title: "Blue in Green", artist: "Bill Evans", music: 'music/track1.mp3'},
      { id: "Jazz4", title: "Fix You", artist: "Coldplay", music: 'music/track2.mp3'}
    ]
  },
    P3: {
    title: "Pop",
    cover: "pic/playlist3.png",
    tracks: [
      { id: "Pop1", title: "Imagine", artist: "John Lennon", music: 'music/track1.mp3'},
      { id: "Pop2", title: "Yellow", artist: "Coldplay", music: 'music/track2.mp3'},
      { id: "Pop3", title: "Fix You", artist: "Coldplay", music: 'music/track2.mp3'}
    ]
  },
  P4: {
    title: "Opera",
    cover: "pic/playlist4.png",
    tracks: [
      { id: "Opera1", title: "Stronger", artist: "Kanye West", music: 'music/track1.mp3'},
      { id: "Opera2", title: "Can't Hold Us", artist: "Macklemore & Ryan Lewis", music: 'music/track1.mp3'},
      { id: "Opera3", title: "Titanium", artist: "David Guetta ft. Sia", music: 'music/track2.mp3'},
      { id: "Opera4", title: "Fix You", artist: "Coldplay", music: 'music/track2.mp3'},
      { id: "Opera5", title: "Can't Hold Us", artist: "Macklemore & Ryan Lewis", music: 'music/track1.mp3'}
    ]
  },


  P5: {
    title: "Ballad",
    cover: "pic/playlist1.png",
    tracks: [
      { id: "Ballad1", title: "Take Five", artist: "Dave Brubeck", music: 'music/track1.mp3'},
      { id: "Ballad2", title: "So What", artist: "Miles Davis", music: 'music/track2.mp3'},
      { id: "Ballad3", title: "Blue in Green", artist: "Bill Evans", music: 'music/track1.mp3'},
      { id: "Ballad4", title: "Fix You", artist: "Coldplay", music: 'music/track2.mp3'}
    ]
  },
    P6: {
    title: "Rock",
    cover: "pic/playlist2.png",
    tracks: [
      { id: "Rock1", title: "Take Five", artist: "Dave Brubeck", music: 'music/track1.mp3'},
      { id: "Rock2", title: "So What", artist: "Miles Davis", music: 'music/track2.mp3'}
    ]
  }
};


const favoriteTrackIds = new Set();
const trackStarsInLibrary = new Map();
const playlistUl = document.querySelector(".track-list");
const playlistHeader = document.querySelector(".playlist-header");
const mainPlaylist = document.querySelector(".playlist-main");
const listFavorites = document.querySelector(".track-favorite-list");

const mainLibrary = document.querySelector(".library-main");
const mainPage = document.querySelector(".home-main");
const mainFavorite = document.querySelector(".favorite-main");

document.getElementById("view-library").onclick = () => {
  mainLibrary.style.display = "block";
  mainPage.style.display = "none";
  mainFavorite.style.display = "none";
  mainPlaylist.style.display = "none";
};

document.getElementById("view-home").onclick = () => {
  mainLibrary.style.display = "none";
  mainPage.style.display = "block";
  mainFavorite.style.display = "none";
  mainPlaylist.style.display = "none";
};

document.getElementById("view-favorite").onclick = () => {
  mainLibrary.style.display = "none";
  mainPage.style.display = "none";
  mainFavorite.style.display = "block";
  mainPlaylist.style.display = "none";
};

const nav = document.querySelector(".nav-menu");
document.querySelector(".hamburger-menu").onclick = () => {
  nav.classList.toggle("hide");
};

const childPlaylist = document.querySelectorAll(".library-item-child");

childPlaylist.forEach(cp => {
  cp.onclick = function () {
    const parentPlaylist = this.parentElement;
    const key = parentPlaylist.getAttribute("data-track-id");
    const searPlaylist = playlists[key];

    mainPlaylist.style.display = "block";
    mainLibrary.style.display = "none";
    mainPage.style.display = "none";
    mainFavorite.style.display = "none";

    playlistHeader.innerHTML = "";
    const playlistTitle = document.createElement("div");
    playlistTitle.classList.add("playlist-title");
    playlistTitle.textContent = searPlaylist.title;
    const playlistImage = document.createElement("img");
    playlistImage.classList.add("playlist-image");
    playlistImage.src = searPlaylist.cover;
    playlistHeader.appendChild(playlistTitle);
    playlistHeader.appendChild(playlistImage);

    playlistUl.innerHTML = "";

    searPlaylist.tracks.forEach((track, index) => {
      const trackEl = document.createElement("li");
      trackEl.className = "tracko";
      trackEl.setAttribute("data-track-id", track.id);

      trackEl.innerHTML = `
        <div class="track-number">${index + 1}</div>
        <button class="play-button" onclick="playTrack('${track.music}')">▶</button>
        <div class="track-info">
          <h3>${track.title}</h3>
          <p>${track.artist}</p>
        </div>
        <span class="track-star">★</span>
      `;

      const starBtn = trackEl.querySelector(".track-star");
      trackStarsInLibrary.set(track.id, starBtn); 
      trackEl.querySelector(".track-star").onclick = function () {
        const trackId = track.id;
        if (favoriteTrackIds.has(trackId)) return;

        favoriteTrackIds.add(trackId);
        starBtn.classList.add("active");

        const favoriteItem = trackEl.cloneNode(true);
        favoriteItem.setAttribute("data-track-id", trackId);

        const currentCount = listFavorites.children.length + 1;
        favoriteItem.querySelector(".track-number").textContent = currentCount;

        const favStar = favoriteItem.querySelector(".track-star");
        favStar.classList.add("active");

        favStar.onclick = function () {
          favoriteItem.remove();
          favoriteTrackIds.delete(trackId);

          const originalStar = trackStarsInLibrary.get(trackId);
          if (originalStar) originalStar.classList.remove("active");

          Array.from(listFavorites.children).forEach((item, i) => {
          const numDiv = item.querySelector(".track-number");
          if (numDiv) numDiv.textContent = i + 1;
          });
        };

        listFavorites.appendChild(favoriteItem);
      };

      playlistUl.appendChild(trackEl);
    });
  };
});
