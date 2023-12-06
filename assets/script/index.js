'use strict';

// Imports
import { onEvent, select, selectAll } from './utils.js';

// Selections
const modalOne = select('.one');
const modalTwo = select('.two');
const btnAccept = select('.accept');
const btnSettings = select('.settings');
const btnPreferences = select('.preferences');
const overlay = select('.overlay');
const toggleSwitches = selectAll('input');

/* - - - - - MAIN CODE - - - - - */
// Select the toggle switchces by default
toggleSwitches.forEach(toggleSwitch => (toggleSwitch.checked = true));
let life = 15;
let array = ['Browser', 'Operating system', 'Width', 'Height'];

// Get the system browser
function getSystemBrowser() {
  const browser = navigator.userAgent.toLowerCase();

  if (/edg/.test(browser)) return 'Edge';
  if (/chrome/.test(browser)) return 'Chrome';
  if (/firefox/.test(browser)) return 'Firefox';
}

// Get the operating system
function getOS() {
  const opSystem = navigator.userAgent;
  let macOrIOS = /(macintosh|macintel|macppc|mac68k|macos|iphone|ipad|ipod)/i;
  let windowsSystems = /(win32|win64|windows|wince)/i;

  if (macOrIOS.test(opSystem)) {
    return 'Mac/iOS';
  } else if (windowsSystems.test(opSystem)) {
    return 'Windows';
  } else {
    return 'Other';
  }
}

// Set cookies for browser
function setBrowserCookie() {
  setCookie('Browser', getSystemBrowser());
}

// Set cookies for operating system
function setOSCookie() {
  let OSKey = encodeURIComponent('Operating system');
  let OSValue = encodeURIComponent(`${getOS()}`);

  setCookie(OSKey, OSValue);
}

// Set cookies for screen dimensions
function setWidthCookie() {
  let screenWidth = `${window.innerWidth}px`;
  setCookie('Width', screenWidth);
}

function setHeightCookie() {
  let screenHeight = `${window.innerHeight}px`;
  setCookie('Height', screenHeight);
}

// Get the cookies
function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : 'Rejected';
}

function setCookie(key, value) {
  document.cookie = `${key}=${value}; path=/; max-age=${life}; SameSite=Lax`;
}

// Check the cookies
function checkCookies() {
  if (!navigator.cookieEnabled || document.cookie.length === 0) {
    console.log('No cookies available');
    setTimeout(() => {
      openModalOne();
    }, 2000);
  } else {
    printCookies();
  }
}

function printCookies() {
  console.log(`Browser: ${getCookie('Browser')}`);
  console.log(
    `Operating system: ${getCookie(encodeURIComponent('Operating system'))}`
  );
  console.log(`Width: ${getCookie('Width')}`);
  console.log(`Height: ${getCookie('Height')}`);
}

function acceptAllCookies() {
  setBrowserCookie();
  setOSCookie();
  setWidthCookie();
  setHeightCookie();

  console.log('All cookies are available');
  printCookies();
}

function checkPreferences() {
  const userPreferences = toggleSwitches.filter(
    toggleSwitch => toggleSwitch.checked === true
  );

  array.forEach(cookieName => {
    const isPreferenceSelected = userPreferences.some(preference =>
      preference.classList.contains(cookieName.toLowerCase())
    );

    if (isPreferenceSelected) {
      switch (cookieName) {
        case 'Browser':
          setBrowserCookie();
          console.log(`Browser: ${getCookie('Browser')}`);
          break;
        case 'Operating system':
          setOSCookie();
          console.log(
            `Operating system: ${getCookie(
              encodeURIComponent('Operating system')
            )}`
          );
          break;
        case 'Width':
          setWidthCookie();
          console.log(`Width: ${getCookie('Width')}`);
          break;
        case 'Height':
          setHeightCookie();
          console.log(`Height: ${getCookie('Height')}`);
          break;
      }
    } else {
      console.log(`${cookieName}: rejected`);
    }
  });
}

function openModalOne() {
  modalOne.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function openModalTwo() {
  modalOne.classList.add('hidden');
  modalTwo.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

/* - - - - - Events - - - - - */
onEvent('load', window, () => {
  checkCookies();
});

onEvent('click', btnSettings, () => {
  openModalTwo();
});

onEvent('click', btnAccept, () => {
  acceptAllCookies();
  modalOne.classList.add('hidden');
  overlay.classList.add('hidden');
});

onEvent('click', btnPreferences, () => {
  checkPreferences();
  modalTwo.classList.add('hidden');
  overlay.classList.add('hidden');
});
