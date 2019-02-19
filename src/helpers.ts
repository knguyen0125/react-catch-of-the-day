export function formatPrice(cents: number) {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
}

export function random(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function getFunName() {
  const adjectives = [
    'adorable',
    'beautiful',
    'clean',
    'drab',
    'elegant',
    'fancy',
    'glamorous',
    'handsome',
    'long',
    'magnificent',
    'old-fashioned',
    'plain',
    'quaint',
    'sparkling',
    'ugliest',
    'unsightly',
    'angry',
    'bewildered',
    'clumsy',
    'defeated',
    'embarrassed',
    'fierce',
    'grumpy',
    'helpless',
    'itchy',
    'jealous',
    'lazy',
    'mysterious',
    'nervous',
    'obnoxious',
    'panicky',
    'repulsive',
    'scary',
    'thoughtless',
    'uptight',
    'worried'
  ];

  const nouns = [
    'women',
    'men',
    'children',
    'teeth',
    'feet',
    'people',
    'leaves',
    'mice',
    'geese',
    'halves',
    'knives',
    'wives',
    'lives',
    'elves',
    'loaves',
    'potatoes',
    'tomatoes',
    'cacti',
    'foci',
    'fungi',
    'nuclei',
    'syllabuses',
    'analyses',
    'diagnoses',
    'oases',
    'theses',
    'crises',
    'phenomena',
    'criteria',
    'data'
  ];

  return `${random(adjectives)}-${random(adjectives)}-${random(nouns)}`;
}
