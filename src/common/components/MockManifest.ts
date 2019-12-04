import { Manifest } from "../interfaces";

const MockManifest: Manifest = {
  general: {
    title: 'Mock Datasite Title',
    description: `
This is my mock datasite!

## Header Level Two

Nelsons folly spyglass scourge of the seven seas rum come about hempen halter me red ensign gibbet black spot. Provost log bilged on her anchor boatswain ballast reef hulk yardarm pink galleon. Galleon grog blossom red ensign walk the plank hail-shot bilge case shot lateen sail boom broadside.

This is a cool [link](https://www.catsonsynthesizersinspace.com/).

### Header Level Three

Scallywag to go on account Sail ho gangway doubloon Spanish Main jack splice the main brace cackle fruit cutlass. Ahoy belay nipperkin Corsair pressgang doubloon hogshead cog hempen halter bilge water. Hempen halter hang the jib mizzen loot Barbary Coast trysail fathom walk the plank clipper Yellow Jack.

### Another Level Three Item

Pink marooned belay jack square-rigged pillage bounty poop deck grog blossom reef sails. Letter of Marque killick run a shot across the bow Buccaneer booty Brethren of the Coast warp bilge water careen clap of thunder. Letter of Marque wherry Corsair coffer gangway handsomely spike hulk Buccaneer parrel.

Items in a **List**:

- One
- Two
- Three

Items in a **Table**:

| Animal | Fun       |
| ------ | --------- |
| Dog    | Yes       |
| Cat    | Sometimes |
| Crab   | No        |

Splice the main brace tackle Sea Legs trysail grapple jack lookout weigh anchor hogshead ballast. Crack Jennys tea cup line Privateer no prey, no pay gunwalls topmast Cat o'nine tails maroon crimp spyglass. Yo-ho-ho Cat o'nine tails lad sloop keel bucko Shiver me timbers furl dead men tell no tales keelhaul.

## Another Header

Marooned log Pieces of Eight broadside mizzen Brethren of the Coast furl line Pirate Round starboard. Fire in the hole matey swab Corsair driver Yellow Jack chantey barkadeer yard hail-shot. Rum Letter of Marque Jack Tar scourge of the seven seas Gold Road gally Yellow Jack topgallant walk the plank tackle.

Bring a spring upon her cable draught bilge furl lanyard case shot hogshead Pieces of Eight grog Blimey. Hearties line swab boom six pounders long clothes bring a spring upon her cable warp Plate Fleet hornswaggle. Cog chase guns long clothes mutiny topsail spirits long boat measured fer yer chains matey Arr.

Test two three
`.trim()
  },
  dashboards: [
    {
      title: 'My Mock Dashboard',
      slug: 'my-mock-dashboard',
      description: 'This is my mock dashboard!\n\nIt looks *great*.',
      dataset: 'SHAPES',
      filters: [
        {
          id: 1,
          column: 'color',
          filterValue: 'blue',
          enabled: false
        },
        {
          id: 2,
          column: 'color',
          filterValue: 'red',
          enabled: false
        },
        {
          id: 3,
          column: 'shape',
          filterValue: 'circle',
          enabled: false
        },
        {
          id: 4,
          column: 'deluxe',
          filterValue: 'true',
          enabled: false
        }
      ]
    }
  ]
};

export default MockManifest;
