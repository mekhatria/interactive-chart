/* ONE list of every collection and chart on mekhatria.github.io/interactive-chart/.
   The main page, the collection pages (/energy/, /anatomy/) and the "All charts" menu are all built from it.
   To add a chart: add one entry to `charts`. To add a collection: add one entry to `categories`
   and create its repo with an index.html like /anatomy/index.html. */
window.CATALOG = {
  base: '/interactive-chart',   // the repo name: mekhatria.github.io/interactive-chart/
  categories: [
    {
      id: 'energy', name: 'Energy', title: 'Energy', accent: '#5B95FA', page: '/energy/',
      blurb: 'How electricity is made and used: power plants, AI data centers, night lights, and where energy is lost.'
    },
    {
      id: 'anatomy', name: 'Anatomy', title: 'Anatomy', accent: '#F2A65A', page: '/anatomy/',
      blurb: 'Take things apart. Interactive diagrams you can turn and explore, part by part.'
    },
    {
      id: 'history', name: 'History', title: 'History', accent: '#3FBFAD', page: '/history/',
      blurb: 'The past, mapped. Follow famous journeys and events across the world, year by year.'
    }
  ],

  charts: [
    {
      id: 'great-explorers', title: 'The Journeys of 10 Great Explorers', cats: ['history'], isNew: true,
      tags: ['Map', 'Animated'], thumb: '/thumbs/great-explorers.jpg', href: '/history/great-explorers/',
      desc: 'Every major journey of ten famous explorers, from Leif Erikson to Amundsen. Press play to watch the routes unfold across 900 years.'
    },
    {
      id: 'sailboat', title: 'Anatomy of a Sailboat', cats: ['anatomy'], isNew: true,
      tags: ['3D', 'Interactive'], thumb: '/thumbs/sailboat.jpg', href: '/anatomy/sailboat/',
      desc: 'A 3D sailboat you can turn. Hover a part, or switch on every label, to see what each one does.'
    },
    {
      id: 'ai-data-center', title: 'Inside an AI Data Center', cats: ['anatomy'], isNew: true,
      tags: ['Diagram', 'Interactive'], thumb: '/thumbs/ai-data-center.jpg', href: '/anatomy/ai-data-center/',
      desc: 'Compute, storage, networking, power and cooling. Hover any part to see what it does and how it connects.'
    },
    {
      id: 'ak-12', title: 'Anatomy of the AK-12', cats: ['anatomy'], isNew: true,
      tags: ['3D', 'Exploded view'], thumb: '/thumbs/ak-12.jpg', href: '/anatomy/ak-12/',
      desc: 'A 3D model you can turn and take apart. Hover any part, from the muzzle brake to the folding stock, to see what it does.'
    },
    {
      id: 'hk416-a8', title: 'Anatomy of the HK416 A8', cats: ['anatomy'], isNew: true,
      tags: ['3D', 'Exploded view'], thumb: '/thumbs/hk416-a8.jpg', href: '/anatomy/hk416-a8/',
      desc: 'A 3D model you can turn and take apart. Hover any part, from the flash hider to the buffer tube, to see what it does.'
    },
    {
      id: 'us-energy-losses', title: "Where America's Energy Goes", cats: ['energy'],
      tags: ['Sankey', 'Animated'], thumb: '/thumbs/us-energy-losses.jpg', href: '/energy/us-energy-losses/',
      desc: 'All US energy in 2024, from source to use. Follow the particles and a short guided tour: two-thirds of it is lost as heat.'
    },
    {
      id: 'china-night-lights', title: 'China After Dark', cats: ['energy'],
      tags: ['Satellite', 'Animated'], thumb: '/thumbs/china-night-lights.jpg', href: '/energy/china-night-lights/',
      desc: 'Satellite night lights from 1992 to 2024. Watch light spread from a few coastal cities across the country.'
    },
    {
      id: 'us-ai-data-centers-map', title: "America's AI Power Map", cats: ['energy'],
      tags: ['Map', 'Animated'], thumb: '/thumbs/us-ai-data-centers-map.jpg', href: '/energy/us-ai-data-centers-map/',
      desc: '77 US AI data centers, online and planned. Play the timeline from 2023 to 2029 and watch capacity grow past 40 GW.'
    },
    {
      id: 'data-center-power-context', title: 'How Much Power Does AI Need?', cats: ['energy'],
      tags: ['3D', 'Animated'], thumb: '/thumbs/data-center-power-context.jpg', href: '/energy/data-center-power-context/',
      desc: 'One planned AI campus next to everyday power users, from a bus depot to a whole city and a nuclear reactor.'
    },
    {
      id: 'norwegian-power-station-locations', title: "Norway's Power Stations", cats: ['energy'],
      tags: ['Map'], thumb: '/thumbs/norwegian-power-station-locations.jpg', href: '/energy/norwegian-power-station-locations/',
      desc: 'Every generating station with a known location, sized by capacity. 39.2 GW in total, 85% of it from water.'
    }
  ]
};
