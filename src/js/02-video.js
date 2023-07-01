import Player from '@vimeo/player';
import _throttle from 'lodash.throttle';

const STORAGE_KEY = "videoplayer-current-time";
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function onTimeUpdate({seconds }) {
    localStorage.setItem(STORAGE_KEY, seconds)
 }

player.on('timeupdate', _throttle(onTimeUpdate, 1000));


const currentTime = localStorage.getItem(STORAGE_KEY)
player.setCurrentTime(currentTime);
