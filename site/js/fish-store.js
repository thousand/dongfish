class FishPart {
  constructor(...args) {
    this.partList = Array.isArray(args[0]) ? args[0] : args;
  }
  sample() {
    return this.partList[Math.floor(Math.random() * this.partList.length)];
  }
}

const FISH_GUTS = new FishPart([
  {
    name: 'normy',
    guts: `DONG`,
  },
  {
    name: 'ascii-8D',
    guts: `8===D`,
  },
  // {
  //   name: 'ascii-CB',
  //   guts: `C===B`,
  //   right: true,
  // },
  {
    name: 'emoji',
    guts: `🍆`,
  },
]);

const FISH_HEADS = new FishPart([`*>`, `>`, '͒>']);
const FISH_TAILS = new FishPart([`><`, `}<`]);

const FISH_FINS = new FishPart(['̡', '̀', '̗', '̉', '̧', '̏', '⃑']);

function addFishTo(container, e) {
  const { target, layerX, layerY } = e;
  const swimTime =
    Math.random() *
      (Math.PI * Math.random() * (layerX / target.clientWidth) * Math.PI) +
    Math.PI;
  const startY = layerY + (Math.random() * 60 - 30);

  const fish = document.createElement('p');
  fish.classList.add('fish');
  fish.style.setProperty('--swim-speed', `${swimTime}s`);
  fish.style.setProperty('--swim-top', `${startY}px`);

  const guts = FISH_GUTS.sample().guts;
  const gutsArray = [...guts];
  gutsArray.splice(
    Math.ceil(Math.random() * gutsArray.length - 2) + 1,
    0,
    Math.random() > 0.5 ? FISH_FINS.sample() : ''
  );
  fish.innerText = `${FISH_TAILS.sample()}${gutsArray.join(
    ''
  )}${FISH_HEADS.sample()}`;

  container.appendChild(fish);
  setTimeout(() => {
    requestAnimationFrame(() => {
      fish.remove();
    });
  }, swimTime * 1000 + 1);
}

window.addEventListener('DOMContentLoaded', (e) => {
  const tank = document.getElementById('fishtank');
  const add = document.getElementById('add-fish');
  const gridCell = document.getElementById('grid-cell');
  const gridRow = document.getElementById('grid-row');

  console.log(gridRow.clientWidth, gridCell.clientWidth);

  tank.style.setProperty(
    '--swim-steps',
    Math.ceil(gridRow.clientWidth / gridCell.clientWidth)
  );
  add.addEventListener('click', (e) => {
    addFishTo(tank, e);
  });
});
