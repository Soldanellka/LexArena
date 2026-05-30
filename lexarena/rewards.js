// lexarena/rewards.js
import { pridatParagrafy } from "./arena.js";

// základ: 1 hra = 5 §
export const HRA_KOSTA_PARAGRAFY = 5;

// odmeny – čísla, ktoré sme si dohodli
export const REWARDS = {
  challengeAccepted: 3,      // prijatá výzva
  duelWin: 5,                // výhra v dueli
  ladder1st: 50,             // 1. miesto v mesačnom dueli
  ladder2nd: 30,             // 2. miesto
  ladder3rd: 20,             // 3. miesto
  team1st: 30,               // 1. miesto tímu / hráč
  team2nd: 20,               // 2. miesto tímu / hráč
  team3rd: 10,               // 3. miesto tímu / hráč
  createTeam: 5,             // vytvorenie tímu
  inviteAccepted: 2          // prijatá pozvánka do tímu
};

// helper funkcie – budeme ich volať z duelu, tímov, rebríčkov

export function rewardChallengeAccepted() {
  pridatParagrafy(REWARDS.challengeAccepted);
}

export function rewardDuelWin() {
  pridatParagrafy(REWARDS.duelWin);
}

export function rewardLadderPlacement(place) {
  if (place === 1) pridatParagrafy(REWARDS.ladder1st);
  else if (place === 2) pridatParagrafy(REWARDS.ladder2nd);
  else if (place === 3) pridatParagrafy(REWARDS.ladder3rd);
}

export function rewardTeamPlacement(place) {
  if (place === 1) pridatParagrafy(REWARDS.team1st);
  else if (place === 2) pridatParagrafy(REWARDS.team2nd);
  else if (place === 3) pridatParagrafy(REWARDS.team3rd);
}

export function rewardCreateTeam() {
  pridatParagrafy(REWARDS.createTeam);
}

export function rewardInviteAccepted() {
  pridatParagrafy(REWARDS.inviteAccepted);
}
