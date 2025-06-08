import { auth, db, userFavRef } from './firebase.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { setDoc, deleteDoc, onSnapshot, doc } from 'firebase/firestore';

const LOG_PREFIX = '%c[NestPlayer]';
const LOG_STYLE = 'color:#7b6dff;font-weight:600';
const log = (msg, ...rest) => console.log(LOG_PREFIX, LOG_STYLE, msg, ...rest);
const error = (msg, ...rest) => console.error(LOG_PREFIX, LOG_STYLE + ';background:#ff4d4f;color:#fff', msg, ...rest);

const page = {
    home: !!document.getElementById('home-main'),
    library: !!document.getElementById('library-main'),
    favorite: !!document.getElementById('favorite-main') && !document.getElementById('library-main')
};

const $ = selector => document.querySelector(selector);

const ui = {
    playlistList: $('#track-list'),
    playlistHeader: $('#playlist-header'),
    playlistSection: $('#playlist-main'),
    favoriteList: $('#favorite-track-list'),
    nav: $('.nav-menu'),
    librarySection: $('#library-main'),
    homeSection: $('#home-main'),
    favoriteSection: $('#favorite-main'),
    authArea: $('#auth-area'),
    libraryGrid: $('.library-grid')
};

const state = {
    playlists: {},
    favoriteIds: new Set(),
    starMap: new Map()
};

let currentUid = null;

const playTrack = src => {
    const player = $('#audioPlayer');
    if (!player) return error('audioPlayer element not found');
    player.src = src;
    player.play().catch(e => error('Audio play error', e));
};
window.playTrack = playTrack;

const hideAllSections = () => {
    if (ui.homeSection) ui.homeSection.style.display = 'none';
    if (ui.librarySection) ui.librarySection.style.display = 'none';
    if (ui.favoriteSection) ui.favoriteSection.style.display = 'none';
    if (ui.playlistSection) ui.playlistSection.style.display = 'none';
};

const showLibraryView = view => {
    hideAllSections();
    if (view === 'library' && ui.librarySection) ui.librarySection.style.display = 'block';
    if (view === 'playlist' && ui.playlistSection) ui.playlistSection.style.display = 'block';
    if (ui.nav) ui.nav.classList.add('hide');
};

const updateFavoriteOrder = () => {
    Array.from(ui.favoriteList?.children || []).forEach((li, idx) => {
        const num = li.querySelector('.track-number');
        if (num) num.textContent = String(idx + 1);
    });
};

const saveFavorite = async track => {
    if (!currentUid) return;
    await setDoc(
        doc(db, 'users', currentUid, 'favorites', String(track.id)),
        {
            id: track.id,
            title: track.title,
            artist: track.artist,
            audio: track.audio,
            cover: track.cover
        }
    );
};

const deleteFavorite = async id => {
    if (!currentUid) return;
    await deleteDoc(doc(db, 'users', currentUid, 'favorites', String(id)));
};

const addFavorite = (track, trackEl, starEl) => {
    if (state.favoriteIds.has(track.id)) return;
    state.favoriteIds.add(track.id);
    starEl.classList.add('active');
    const clone = trackEl.cloneNode(true);
    const cloneStar = clone.querySelector('.track-star');
    cloneStar.classList.add('active');
    cloneStar.onclick = () => removeFavorite(track.id, clone);
    ui.favoriteList?.appendChild(clone);
    updateFavoriteOrder();
    saveFavorite(track).catch(e => error('saveFavorite', e));
};

const removeFavorite = (id, el) => {
    state.favoriteIds.delete(id);
    el.remove();
    const origStar = state.starMap.get(id);
    if (origStar) origStar.classList.remove('active');
    updateFavoriteOrder();
    deleteFavorite(id).catch(e => error('deleteFavorite', e));
};

const buildLibraryGrid = () => {
    if (!ui.libraryGrid) return error('libraryGrid element missing');
    ui.libraryGrid.innerHTML = '';
    Object.entries(state.playlists).forEach(([key, pl]) => {
        const item = document.createElement('div');
        item.className = 'library-item';
        item.dataset.trackId = key;
        item.innerHTML = `
            <div class="library-item-child">
                <h4>${pl.title}</h4>
                <img src="${pl.cover}" alt="${pl.title}" style="width:100%"/>
            </div>`;
        ui.libraryGrid.appendChild(item);
    });
    ui.libraryGrid.querySelectorAll('.library-item-child').forEach(child => {
        child.onclick = () => openPlaylist(child.parentElement.dataset.trackId);
    });
};

const openPlaylist = key => {
    const pl = state.playlists[key];
    if (!pl) return error(`Playlist key ${key} not found`);
    ui.playlistHeader.innerHTML = `
        <div class="website-title">${pl.title}</div>
        <img class="website-image" src="${pl.cover}" alt="${pl.title}"/>`;
    ui.playlistList.innerHTML = '';
    pl.tracks.forEach((track, idx) => {
        const li = document.createElement('li');
        li.className = 'track';
        li.dataset.trackId = track.id;
        li.innerHTML = `
            <div class="track-number">${idx + 1}</div>
            <button class="play-button" onclick="playTrack('${track.audio}')">▶</button>
            <div class="track-info">
                <h3>${track.title}</h3>
                <p>${track.artist}</p>
            </div>
            <span class="track-star">★</span>`;
        const star = li.querySelector('.track-star');
        state.starMap.set(track.id, star);
        star.onclick = () => addFavorite(track, li, star);
        ui.playlistList.appendChild(li);
    });
    showLibraryView('playlist');
};

const fetchPlaylists = async () => {
    log('Fetching playlists from Jamendo...');

    const spinner = document.getElementById('library-spinner');
    if (spinner) spinner.style.display = 'block';

    try {
        const res = await fetch('https://api.jamendo.com/v3.0/albums/?client_id=8740c01b&format=json&limit=14');
        const data = await res.json();
        if (!data.results?.length) throw new Error('No albums returned');

        state.playlists = {};

        for (let i = 0; i < data.results.length; i++) {
            const album = data.results[i];
            const tracksRes = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=8740c01b&album_id=${album.id}&format=json&limit=5`);
            const tracksData = await tracksRes.json();
            state.playlists[`P${i + 1}`] = {
                title: album.name,
                cover: album.image,
                tracks: tracksData.results.map(t => ({
                    id: t.id,
                    title: t.name,
                    artist: t.artist_name,
                    audio: t.audio,
                    cover: album.image
                }))
            };
        }

        buildLibraryGrid();
    } catch (e) {
        error('Jamendo fetch error', e);
    } finally {
        if (spinner) spinner.style.display = 'none';
    }
};

const listenUserFavorites = uid => {
    onSnapshot(userFavRef(uid), snapshot => {
        state.favoriteIds.clear();
        if (ui.favoriteList) ui.favoriteList.innerHTML = '';
        for (const docSnap of snapshot.docs) {
            const t = docSnap.data();
            state.favoriteIds.add(t.id);
            const li = document.createElement('li');
            li.className = 'track';
            li.dataset.trackId = t.id;
            li.innerHTML = `
                <div class="track-number">-</div>
                <button class="play-button" onclick="playTrack('${t.audio}')">▶</button>
                <div class="track-info">
                    <h3>${t.title}</h3>
                    <p>${t.artist}</p>
                </div>
                <span class="track-star active">★</span>`;
            li.querySelector('.track-star').onclick = () => removeFavorite(t.id, li);
            ui.favoriteList?.appendChild(li);
        }
        updateFavoriteOrder();
    });
};

const protectRoutes = (user) => {
    const path = location.pathname;
    const isPublic =
        path.endsWith('/') ||
        path.endsWith('/index.html') ||
        path.endsWith('/login.html') ||
        path.endsWith('/register.html');

    if (!user && !isPublic) {
        log('Redirecting unauthenticated user to login');
        location.href = '/login.html';
    }
};


window.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, user => {
        protectRoutes(user);

        if (!ui.authArea) return;

        if (user) {
            if (!user.emailVerified) {
                alert('Potwierdź swój e-mail przed korzystaniem z aplikacji.');
                signOut(auth).then(() => {
                    location.href = 'login.html';
                });
                return;
            }

            currentUid = user.uid;
            listenUserFavorites(user.uid);
            const name = user.displayName || user.email;
            ui.authArea.innerHTML = `
      <span class="text-white me-2">Zalogowano jako: <strong>${name}</strong></span>
      <button class="btn btn-outline-light btn-sm" id="logout-btn">Wyloguj</button>`;
            $('#logout-btn').onclick = () => signOut(auth).then(() => location.href = 'login.html');
        } else {
            currentUid = null;
            if (ui.favoriteList) ui.favoriteList.innerHTML = '';
            state.favoriteIds.clear();
            ui.authArea.innerHTML = `
      <a class="btn btn-outline-light btn-sm" href="../login.html">Logowanie</a>
      <a class="btn btn-primary btn-sm" href="../register.html">Rejestracja</a>`;
        }
    });

    if (page.library) {
        fetchPlaylists();
        $('.hamburger-menu')?.addEventListener('click', () => ui.nav.classList.toggle('hide'));
        showLibraryView('library');
    }
});
